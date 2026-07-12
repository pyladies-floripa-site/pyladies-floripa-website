const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024

export async function readImageFile(file: File): Promise<{ ok: true; dataUrl: string } | { ok: false; error: string }> {
  if (!file.type.startsWith('image/')) {
    return { ok: false, error: 'Selecione um arquivo de imagem (JPG, PNG ou WebP).' }
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return { ok: false, error: 'A imagem precisa ter no máximo 2 MB.' }
  }

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
        return
      }

      reject(new Error('Não foi possível ler a imagem.'))
    }

    reader.onerror = () => reject(new Error('Não foi possível ler a imagem.'))
    reader.readAsDataURL(file)
  })

  return { ok: true, dataUrl }
}
