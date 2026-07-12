import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  changePortalPassword,
  loginPortal,
  logoutPortal,
  validatePortalSession,
} from '../lib/portalAuth'
import { useEvents } from '../lib/eventsStore'
import { readImageFile } from '../lib/imageUpload'
import { usePageSeo } from '../lib/seo'
import { isSafeHttpUrl } from '../lib/safeUrl'
import { useFocusTrap } from '../lib/useFocusTrap'
import {
  createEventId,
  filterEvents,
  formatDisplayDate,
  getEventMonthOptions,
  sortEvents,
  type Event,
  type EventSortOption,
} from '../data/events'
import styles from './PortalPage.module.css'

const sortOptions: { value: EventSortOption; label: string }[] = [
  { value: 'recent', label: 'Mais recentes' },
  { value: 'alphabetical', label: 'Ordem alfabética' },
]

const emptyForm = (): Event => ({
  id: '',
  title: '',
  startsAt: '',
  displayDate: '',
  location: '',
  image: '',
  description: '',
  signupUrl: '',
})

export default function PortalPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [query, setQuery] = useState('')
  const [month, setMonth] = useState('')
  const [sortBy, setSortBy] = useState<EventSortOption>('recent')
  const [showForm, setShowForm] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [form, setForm] = useState<Event>(emptyForm)
  const [formError, setFormError] = useState('')
  const [imageUploading, setImageUploading] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [settingsError, setSettingsError] = useState('')
  const [settingsSuccess, setSettingsSuccess] = useState('')

  const imageInputRef = useRef<HTMLInputElement>(null)
  const formModalRef = useRef<HTMLDivElement>(null)
  const settingsModalRef = useRef<HTMLDivElement>(null)

  usePageSeo({
    title: 'Portal de eventos',
    description: 'Área restrita para gestão de eventos da PyLadies Floripa.',
    path: '/portal',
    noindex: true,
  })

  useEffect(() => {
    let active = true

    validatePortalSession().then((valid) => {
      if (active) {
        setAuthenticated(valid)
        setAuthChecking(false)
      }
    })

    return () => {
      active = false
    }
  }, [])

  const { events, addEvent, updateEvent, deleteEvent } = useEvents()

  const monthOptions = useMemo(() => getEventMonthOptions(events), [events])

  const filteredEvents = useMemo(() => {
    const filtered = filterEvents(events, { query, period: 'all', month })
    return sortEvents(filtered, sortBy)
  }, [events, query, month, sortBy])

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    setLoginLoading(true)
    setLoginError('')

    const success = await loginPortal(password)

    if (success) {
      setAuthenticated(true)
      setPassword('')
    } else {
      setLoginError('Senha incorreta.')
    }

    setLoginLoading(false)
  }

  const handleLogout = () => {
    logoutPortal()
    setAuthenticated(false)
    setShowSettings(false)
    setShowForm(false)
  }

  const openCreateForm = () => {
    setEditingEvent(null)
    setForm(emptyForm())
    setFormError('')
    setShowForm(true)
  }

  const openEditForm = (event: Event) => {
    setEditingEvent(event)
    setForm({ ...event, signupUrl: event.signupUrl ?? '' })
    setFormError('')
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingEvent(null)
    setForm(emptyForm())
    setFormError('')
    setImageUploading(false)

    if (imageInputRef.current) {
      imageInputRef.current.value = ''
    }
  }

  useFocusTrap(formModalRef, showForm, closeForm)
  useFocusTrap(settingsModalRef, showSettings, () => setShowSettings(false))

  const handleImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setImageUploading(true)
    setFormError('')

    const result = await readImageFile(file)

    if (!result.ok) {
      setFormError(result.error)
      setImageUploading(false)
      return
    }

    setForm((current) => ({ ...current, image: result.dataUrl }))
    setImageUploading(false)
  }

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault()

    const title = form.title.trim()
    const location = form.location.trim()
    const description = form.description.trim()
    const image = form.image.trim()
    const signupUrl = form.signupUrl?.trim()

    if (!title || !form.startsAt || !location || !description || !image) {
      setFormError('Preencha título, data, local, descrição e imagem.')
      return
    }

    if (signupUrl && !isSafeHttpUrl(signupUrl)) {
      setFormError('O link de inscrição precisa começar com http:// ou https://')
      return
    }

    const payload: Event = {
      id: editingEvent?.id ?? createEventId(title, form.startsAt),
      title,
      startsAt: form.startsAt,
      displayDate: formatDisplayDate(form.startsAt),
      location,
      image,
      description,
      ...(signupUrl ? { signupUrl } : {}),
    }

    if (editingEvent) {
      updateEvent(payload)
    } else {
      if (events.some((item) => item.id === payload.id)) {
        setFormError('Já existe um evento com esse título e data.')
        return
      }

      addEvent(payload)
    }

    closeForm()
  }

  const handleDelete = (event: Event) => {
    const confirmed = window.confirm(`Excluir o evento "${event.title}"?`)

    if (confirmed) {
      deleteEvent(event.id)
    }
  }

  const handlePasswordChange = async (event: FormEvent) => {
    event.preventDefault()
    setSettingsError('')
    setSettingsSuccess('')

    if (newPassword !== confirmPassword) {
      setSettingsError('A confirmação da nova senha não confere.')
      return
    }

    const result = await changePortalPassword(currentPassword, newPassword)

    if (!result.ok) {
      setSettingsError(result.error)
      return
    }

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setSettingsSuccess('Senha atualizada com sucesso.')
  }

  if (authChecking) {
    return (
      <div className={styles.page}>
        <div className={styles.loginCard}>
          <p className={styles.loginText}>Verificando acesso...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className={styles.page}>
        <div className={styles.loginCard}>
          <p className={styles.eyebrow}>PyLadies Floripa</p>
          <h1 className={styles.loginTitle}>Portal</h1>
          <p className={styles.loginText}>Acesso restrito para voluntárias.</p>

          <form className={styles.loginForm} onSubmit={handleLogin}>
            <label className={styles.field}>
              <span className={styles.label} id="portal-password-label">
                Senha
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={styles.input}
                autoComplete="current-password"
                aria-describedby={loginError ? 'portal-login-error' : undefined}
                aria-invalid={Boolean(loginError)}
                required
              />
            </label>

            {loginError ? (
              <p id="portal-login-error" className={styles.error} role="alert">
                {loginError}
              </p>
            ) : null}

            <button type="submit" className={styles.primaryButton} disabled={loginLoading}>
              {loginLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>PyLadies Floripa</p>
            <h1 className={styles.title}>Portal de eventos</h1>
          </div>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => {
                setShowSettings(true)
                setSettingsError('')
                setSettingsSuccess('')
              }}
            >
              Trocar senha
            </button>
            <button type="button" className={styles.ghostButton} onClick={handleLogout}>
              Sair
            </button>
          </div>
        </header>

        <section className={styles.toolbar}>
          <label className={styles.searchField}>
            <span className={styles.srOnly}>Buscar eventos</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por título, local ou tema..."
              className={styles.searchInput}
            />
          </label>

          <div className={styles.toolbarRow}>
            <div className={styles.filtersGroup}>
              <label className={`${styles.selectField} ${styles.monthField}`}>
                <span className={styles.srOnly}>Filtrar por mês</span>
                <select
                  value={month}
                  onChange={(event) => setMonth(event.target.value)}
                  className={`${styles.select} ${styles.monthSelect} ${month ? styles.selectActive : ''}`}
                >
                  <option value="">Todos os meses</option>
                  {monthOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className={`${styles.selectField} ${styles.sortField}`}>
                <span className={styles.srOnly}>Ordenar eventos</span>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as EventSortOption)}
                  className={`${styles.select} ${styles.sortSelect}`}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button type="button" className={styles.primaryButton} onClick={openCreateForm}>
              Adicionar evento
            </button>
          </div>
        </section>

        <p className={styles.resultsCount}>
          {filteredEvents.length}{' '}
          {filteredEvents.length === 1 ? 'evento encontrado' : 'eventos encontrados'}
        </p>

        {filteredEvents.length > 0 ? (
          <ul className={styles.list}>
            {filteredEvents.map((event) => (
              <li key={event.id} className={styles.item}>
                <div className={styles.itemThumb}>
                  <img src={event.image} alt={`Imagem do evento ${event.title}`} className={styles.itemImage} />
                </div>

                <div className={styles.itemMain}>
                  <h2 className={styles.itemTitle}>{event.title}</h2>
                  <p className={styles.itemMeta}>
                    {event.displayDate} · {event.location}
                  </p>
                </div>

                <div className={styles.itemActions}>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => openEditForm(event)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className={styles.dangerButton}
                    onClick={() => handleDelete(event)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Nenhum evento encontrado</p>
            <p className={styles.emptyText}>Tente outro termo de busca ou adicione um evento.</p>
          </div>
        )}
      </div>

      {showForm ? (
        <div className={styles.overlay} onClick={closeForm}>
          <div
            ref={formModalRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-form-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="event-form-title" className={styles.modalTitle}>
              {editingEvent ? 'Editar evento' : 'Adicionar evento'}
            </h2>

            <form className={styles.form} onSubmit={handleFormSubmit}>
              <label className={styles.field}>
                <span className={styles.label}>Título</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className={styles.input}
                  required
                />
              </label>

              <label className={`${styles.field} ${styles.dateField}`}>
                <span className={styles.label}>Data</span>
                <input
                  type="date"
                  value={form.startsAt}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, startsAt: event.target.value }))
                  }
                  className={`${styles.input} ${styles.dateInput}`}
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Local</span>
                <input
                  type="text"
                  value={form.location}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, location: event.target.value }))
                  }
                  className={styles.input}
                  required
                />
              </label>

              <div className={styles.field}>
                <span className={styles.label}>Imagem</span>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className={styles.fileInput}
                  onChange={handleImageSelect}
                />

                {form.image ? (
                  <div className={styles.imagePreview}>
                    <img src={form.image} alt="Prévia da imagem do evento" className={styles.previewImage} />
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() => imageInputRef.current?.click()}
                      disabled={imageUploading}
                    >
                      {imageUploading ? 'Carregando...' : 'Trocar imagem'}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={styles.uploadArea}
                    onClick={() => imageInputRef.current?.click()}
                    disabled={imageUploading}
                  >
                    <span className={styles.uploadIcon} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 16V8M12 8L9 11M12 8L15 11"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 16.5V18.5C5 19.3284 5.67157 20 6.5 20H17.5C18.3284 20 19 19.3284 19 18.5V16.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <span className={styles.uploadTitle}>
                      {imageUploading ? 'Carregando imagem...' : 'Escolher imagem'}
                    </span>
                    <span className={styles.uploadHint}>JPG, PNG ou WebP · até 2 MB</span>
                  </button>
                )}
              </div>

              <label className={styles.field}>
                <span className={styles.label}>Descrição</span>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, description: event.target.value }))
                  }
                  className={styles.textarea}
                  rows={4}
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Link de inscrição (opcional)</span>
                <input
                  type="url"
                  value={form.signupUrl ?? ''}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, signupUrl: event.target.value }))
                  }
                  className={styles.input}
                  placeholder="https://"
                />
              </label>

              {formError ? <p className={styles.error}>{formError}</p> : null}

              <div className={styles.formActions}>
                <button type="button" className={styles.ghostButton} onClick={closeForm}>
                  Cancelar
                </button>
                <button type="submit" className={styles.primaryButton}>
                  {editingEvent ? 'Salvar alterações' : 'Adicionar evento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {showSettings ? (
        <div className={styles.overlay} onClick={() => setShowSettings(false)}>
          <div
            ref={settingsModalRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="settings-title" className={styles.modalTitle}>
              Trocar senha
            </h2>

            <form className={styles.form} onSubmit={handlePasswordChange}>
              <label className={styles.field}>
                <span className={styles.label}>Senha atual</span>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  className={styles.input}
                  autoComplete="current-password"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Nova senha</span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className={styles.input}
                  autoComplete="new-password"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Confirmar nova senha</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className={styles.input}
                  autoComplete="new-password"
                  required
                />
              </label>

              {settingsError ? <p className={styles.error}>{settingsError}</p> : null}
              {settingsSuccess ? <p className={styles.success}>{settingsSuccess}</p> : null}

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.ghostButton}
                  onClick={() => setShowSettings(false)}
                >
                  Fechar
                </button>
                <button type="submit" className={styles.primaryButton}>
                  Salvar nova senha
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
