import type { ResumoExecutivoData } from '@/lib/frentes'
import { StatusBadge } from './StatusBadge'
import { ChannelList } from './ChannelList'

interface Props {
  data: ResumoExecutivoData
}

export function ResumoExecutivo({ data }: Props) {
  return (
    <section id="resumo-executivo" className="scroll-mt-28 mb-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold">
            <span className="text-gupy-anil">Resumo Executivo</span>
            <span className="text-gray-800"> — {data.title}</span>
          </h2>
          {data.subtitle && (
            <p className="text-sm text-gray-500 mt-0.5">{data.subtitle}</p>
          )}
        </div>
        <StatusBadge status={data.status} label={data.statusLabel} />
      </div>

      {/* Black strip — two columns */}
      <div className="bg-gupy-azul-escuro rounded-card px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* OPP */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest">
              Oportunidades (OPP)
            </h3>
            <span className="text-3xl font-medium text-white">{data.opp.atingimento}%</span>
          </div>
          <ul className="space-y-1.5 mb-4">
            {data.opp.bullets.map((b, i) => (
              <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                <span className="text-gupy-verde mt-0.5 flex-shrink-0">–</span>
                <span dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
              </li>
            ))}
          </ul>
          <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Por canal</p>
          <ChannelList canais={data.opp.canais} />
        </div>

        {/* Pipeline */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest">
              Novo Pipeline
            </h3>
            <span className="text-3xl font-medium text-white">{data.pipeline.atingimento}%</span>
          </div>
          <ul className="space-y-1.5 mb-4">
            {data.pipeline.bullets.map((b, i) => (
              <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                <span className="text-gupy-verde mt-0.5 flex-shrink-0">–</span>
                <span dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
              </li>
            ))}
          </ul>
          <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Por canal</p>
          <ChannelList canais={data.pipeline.canais} />
        </div>
      </div>
    </section>
  )
}
