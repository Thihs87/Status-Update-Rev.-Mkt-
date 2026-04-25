import type { Metrica } from '@/lib/frentes'
import { ProgressBar } from './ProgressBar'

interface Props {
  metricas: Metrica[]
  status: string
}

export function MetricStrip({ metricas, status }: Props) {
  return (
    <div className="bg-gupy-azul-escuro rounded-card px-6 py-5 mb-6 grid gap-6"
      style={{ gridTemplateColumns: `repeat(${Math.min(metricas.length, 3)}, 1fr)` }}
    >
      {metricas.map((m) => (
        <div key={m.label}>
          <p className="text-xs text-white/50 uppercase tracking-wide mb-1">{m.label}</p>
          <p className="text-2xl font-medium text-white leading-none mb-0.5">{m.valor}</p>
          <ProgressBar atingimento={m.atingimento} projecao={m.projecao} status={status} />
        </div>
      ))}
    </div>
  )
}
