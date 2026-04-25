'use client'

import { useState, useTransition } from 'react'
import { addComment } from '@/app/actions/comments'
import type { Comment } from '@/lib/supabase'

interface Props {
  frenteSlug: string
  initialComments: Comment[]
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)  return 'agora'
  if (m < 60) return `${m}min atrás`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h atrás`
  const d = Math.floor(h / 24)
  return `${d}d atrás`
}

export function CommentBox({ frenteSlug, initialComments }: Props) {
  const [comments, setComments]   = useState<Comment[]>(initialComments)
  const [content, setContent]     = useState('')
  const [author, setAuthor]       = useState('CMO')
  const [feedback, setFeedback]   = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    const optimistic: Comment = {
      id:          crypto.randomUUID(),
      frente_slug: frenteSlug,
      author:      author || 'CMO',
      content:     content.trim(),
      created_at:  new Date().toISOString(),
    }

    setComments(prev => [optimistic, ...prev])
    const savedContent = content.trim()
    const savedAuthor  = author || 'CMO'
    setContent('')
    setFeedback('Comentário registrado')
    setTimeout(() => setFeedback(''), 3000)

    startTransition(async () => {
      const { error } = await addComment(frenteSlug, savedContent, savedAuthor)
      if (error) {
        setComments(prev => prev.filter(c => c.id !== optimistic.id))
        setFeedback('Erro ao registrar. Tente novamente.')
      }
    })
  }

  return (
    <div className="mt-6 border-t border-gray-100 pt-5">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex items-center gap-3">
          <label className="text-xs text-gray-400 flex-shrink-0">Nome</label>
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="CMO"
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 w-40 focus:outline-none focus:ring-1 focus:ring-gupy-anil"
          />
          {feedback && (
            <span className="text-xs text-gupy-verde-escuro font-medium ml-auto">{feedback}</span>
          )}
        </div>
        <div className="flex gap-2">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            onInput={e => {
              const t = e.currentTarget
              t.style.height = 'auto'
              t.style.height = `${t.scrollHeight}px`
            }}
            placeholder="Deixe um comentário sobre esta frente…"
            rows={2}
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-gupy-anil min-h-[60px]"
          />
          <button
            type="submit"
            disabled={isPending || !content.trim()}
            className="self-end px-4 py-2 rounded-lg bg-gupy-anil text-white text-sm font-medium disabled:opacity-40 hover:bg-gupy-anil-claro transition-colors"
          >
            Enviar
          </button>
        </div>
      </form>

      {/* Comments list */}
      {comments.length > 0 && (
        <ul className="mt-4 space-y-3">
          {comments.map(c => (
            <li key={c.id} className="flex gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gupy-verde flex items-center justify-center text-xs font-bold text-gupy-azul-escuro">
                {(c.author ?? 'C').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-gray-700">{c.author}</span>
                  <span className="text-xs text-gray-400">{timeAgo(c.created_at)}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed break-words">{c.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
