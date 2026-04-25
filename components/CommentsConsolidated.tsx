import Link from 'next/link'
import { getAllComments } from '@/lib/supabase'
import { getAllFrentes, FRENTE_LABELS } from '@/lib/frentes'

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

export async function CommentsConsolidated() {
  const [allComments, frentes] = await Promise.all([
    getAllComments(),
    Promise.resolve(getAllFrentes()),
  ])

  const frenteMap = Object.fromEntries(frentes.map(f => [f.slug, f.title]))

  // Group by frente_slug
  const grouped: Record<string, typeof allComments> = {}
  for (const c of allComments) {
    if (!grouped[c.frente_slug]) grouped[c.frente_slug] = []
    grouped[c.frente_slug].push(c)
  }

  // Sort groups by most recent comment
  const sortedGroups = Object.entries(grouped).sort(([, a], [, b]) => {
    const latestA = new Date(a[0].created_at).getTime()
    const latestB = new Date(b[0].created_at).getTime()
    return latestB - latestA
  })

  if (sortedGroups.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 text-sm">
        Nenhum comentário registrado ainda.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {sortedGroups.map(([slug, comments]) => {
        const title = frenteMap[slug] ?? slug
        const label = FRENTE_LABELS[slug] ?? title

        return (
          <div key={slug}>
            {/* Group header */}
            <div className="flex items-center gap-3 mb-4">
              <Link
                href={`/#${slug}`}
                className="font-semibold text-gupy-anil hover:underline"
              >
                {title}
              </Link>
              <span className="text-xs bg-gupy-verde text-gupy-azul-escuro font-semibold px-2 py-0.5 rounded-full">
                {comments.length}
              </span>
            </div>

            {/* Comments */}
            <ul className="space-y-4">
              {comments.map(c => (
                <li key={c.id} className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gupy-verde flex items-center justify-center text-xs font-bold text-gupy-azul-escuro">
                    {(c.author ?? 'C').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0 bg-gray-50 rounded-card px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-700">{c.author}</span>
                      <span className="text-xs text-gray-400">{timeAgo(c.created_at)}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{c.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
