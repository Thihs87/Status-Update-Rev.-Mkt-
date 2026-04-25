import { statusDotClass } from '@/lib/design-tokens'
import type { Canal } from '@/lib/frentes'

interface Props {
  canais: Canal[]
}

export function ChannelList({ canais }: Props) {
  return (
    <ul className="space-y-2 mt-3">
      {canais.map((c) => {
        const dot = statusDotClass[c.status] ?? 'bg-gray-400'
        return (
          <li key={c.canal} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-white/80">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
              {c.canal}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{c.atingimento}</span>
              {c.observacao && (
                <span className="text-[10px] text-gupy-verde px-1.5 py-0.5 rounded bg-white/10">
                  {c.observacao}
                </span>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
