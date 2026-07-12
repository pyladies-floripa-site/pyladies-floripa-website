const PASSWORD_HASH_KEY = 'pyladies-portal-password-hash'
const AUTH_TOKEN_KEY = 'pyladies-portal-auth-token'
const AUTH_NONCE_KEY = 'pyladies-portal-auth-nonce'

/** SHA-256 da senha inicial. Não armazena texto puro no bundle além do hash */
const INITIAL_PASSWORD_HASH =
  'e4390923b7a9385f6e1aa9c3a9480148e1fe93f8301b6dc563f2fed886d14942'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function getStoredPasswordHash(): Promise<string> {
  const stored = localStorage.getItem(PASSWORD_HASH_KEY)

  if (stored) {
    return stored
  }

  localStorage.setItem(PASSWORD_HASH_KEY, INITIAL_PASSWORD_HASH)
  return INITIAL_PASSWORD_HASH
}

function getPortalSession() {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY)
  const nonce = sessionStorage.getItem(AUTH_NONCE_KEY)

  if (!token || !nonce) {
    return null
  }

  return { token, nonce }
}

async function createAuthSession(): Promise<void> {
  const storedHash = await getStoredPasswordHash()
  const nonce = crypto.randomUUID()
  const token = await hashPassword(`${storedHash}:${nonce}`)

  sessionStorage.setItem(AUTH_TOKEN_KEY, token)
  sessionStorage.setItem(AUTH_NONCE_KEY, nonce)
}

export async function validatePortalSession(): Promise<boolean> {
  const session = getPortalSession()

  if (!session) {
    return false
  }

  const storedHash = await getStoredPasswordHash()
  const expected = await hashPassword(`${storedHash}:${session.nonce}`)

  return session.token === expected
}

export async function loginPortal(password: string): Promise<boolean> {
  const storedHash = await getStoredPasswordHash()
  const inputHash = await hashPassword(password)

  if (inputHash !== storedHash) {
    return false
  }

  await createAuthSession()
  return true
}

export function logoutPortal(): void {
  sessionStorage.removeItem(AUTH_TOKEN_KEY)
  sessionStorage.removeItem(AUTH_NONCE_KEY)
}

export async function changePortalPassword(
  currentPassword: string,
  newPassword: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const trimmedNewPassword = newPassword.trim()

  if (trimmedNewPassword.length < 6) {
    return { ok: false, error: 'A nova senha precisa ter pelo menos 6 caracteres.' }
  }

  const storedHash = await getStoredPasswordHash()
  const currentHash = await hashPassword(currentPassword)

  if (currentHash !== storedHash) {
    return { ok: false, error: 'Senha atual incorreta.' }
  }

  const newHash = await hashPassword(trimmedNewPassword)
  localStorage.setItem(PASSWORD_HASH_KEY, newHash)
  logoutPortal()
  return { ok: true }
}
