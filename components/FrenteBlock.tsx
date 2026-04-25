import type { FrenteData } from '@/lib/frentes'
import type { Comment } from '@/lib/supabase'
import { StatusBadge } from './StatusBadge'
import { AlertBox } from './AlertBox'
import { MetricStrip } from './MetricStrip'
import { MarkdownContent } from './MarkdownContent'
import { CommentBox } from './CommentBox'

interface Props {
  frente: FrenteData
  initialComments: Comment[]
}

export function FrenteBlock({ frente, initialComments }: Props) {
  return (
    <section
      id={frente.slug}
      className="scroll-mt-28 bg-white rounded-card border border-gray-100 px-6 py-6 mb-5 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold leading-snug">
            <span className="text-gupy-anil">{frente.title}</span>
            {frente.subtitle && (
              <span className="text-gray-700"> — {frente.subtitle}</span>
            )}
          </h2>
        </div>
        <div className="flex-shrink-0">
          <StatusBadge status={frente.status} label={frente.statusLabel} />
        </div>
      </div>

      {/* Alert */}
      {frente.alerta && <AlertBox message={frente.alerta} />}

      {/* Metrics */}
      {frente.metricas && frente.metricas.length > 0 && (
        <MetricStrip metricas={frente.metricas} status={frente.status} />
      )}

      {/* Markdown content */}
      <MarkdownContent content={frente.content} />

      {/* Comments */}
      <CommentBox frenteSlug={frente.slug} initialComments={initialComments} />
    </section>
  )
}
