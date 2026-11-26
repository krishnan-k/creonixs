import { useEffect, useRef, useState } from 'react'
import { upload } from '../data'

// Files select pannadhume Cloudinary ku upload (progress, retry, remove)
export function useUploads() {
  const [items, setItems] = useState([])
  const live = useRef(new Map()) // id -> { xhr, preview }
  const seq = useRef(0)

  const patch = (id, data) => setItems((list) => list.map((i) => (i.id === id ? { ...i, ...data } : i)))

  const start = ({ id, file }) => {
    const type = file.type.startsWith('video/') ? 'video' : 'image'
    const body = new FormData()
    body.append('file', file)
    body.append('upload_preset', upload.preset)
    const xhr = new XMLHttpRequest()
    live.current.get(id).xhr = xhr
    patch(id, { state: 'uploading', pct: 0, error: '' })
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${upload.cloudName}/${type}/upload`)
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) patch(id, { pct: Math.round((e.loaded / e.total) * 100) }) }
    xhr.onload = () => {
      let data = {}
      try { data = JSON.parse(xhr.responseText) } catch { /* not JSON */ }
      if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) patch(id, { state: 'done', url: data.secure_url })
      else {
        console.log('[contact] upload failed', file.name, xhr.status, xhr.responseText)
        patch(id, { state: 'error', error: data.error?.message || `HTTP ${xhr.status}` })
      }
    }
    xhr.onerror = () => patch(id, { state: 'error', error: 'Network error. Check your connection and retry.' })
    xhr.send(body)
  }

  const add = (files) => {
    const problems = new Set()
    for (const file of files) {
      const video = file.type.startsWith('video/'), image = file.type.startsWith('image/')
      if (live.current.size >= upload.maxFiles) problems.add(`Maximum ${upload.maxFiles} files allowed.`)
      else if (!video && !image) problems.add(`${file.name}: only image and video files are allowed.`)
      else if (file.size > (video ? upload.maxVideoMB : upload.maxImageMB) * 1024 * 1024)
        problems.add(`${file.name} is too large (images max ${upload.maxImageMB}MB, videos max ${upload.maxVideoMB}MB).`)
      else {
        const item = { id: ++seq.current, file, state: 'uploading', pct: 0, preview: image ? URL.createObjectURL(file) : '' }
        live.current.set(item.id, { preview: item.preview })
        setItems((list) => [...list, item])
        start(item)
      }
    }
    return [...problems]
  }

  const drop = (id) => {
    const entry = live.current.get(id)
    entry?.xhr?.abort()
    if (entry?.preview) URL.revokeObjectURL(entry.preview)
    live.current.delete(id)
  }
  const remove = (id) => { drop(id); setItems((list) => list.filter((i) => i.id !== id)) }
  const clear = () => { [...live.current.keys()].forEach(drop); setItems([]) }

  useEffect(() => () => { [...live.current.keys()].forEach(drop) }, [])

  return { items, add, retry: start, remove, clear }
}
