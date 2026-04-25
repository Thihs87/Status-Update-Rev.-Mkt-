interface Props {
  atingimento: number
  projecao: number
  status: string
}

export function ProgressBar({ atingimento, projecao, status }: Props) {
  const barColor =
    status === 'on-track'  ? '#82c500' :
    status === 'atencao'   ? '#ff5c1d' :
    status === 'risco'     ? '#db4d23' :
    '#003cfd'

  return (
    <div className="mt-2">
      <div className="relative h-1.5 w-full rounded-full bg-white/20">
        {/* atingimento bar */}
        <div
          className="absolute top-0 left-0 h-1.5 rounded-full transition-all"
          style={{ width: `${Math.min(atingimento, 100)}%`, backgroundColor: barColor }}
        />
        {/* projeção marker */}
        {projecao > 0 && projecao <= 100 && (
          <div
            className="absolute top-[-2px] h-[10px] w-[2px] rounded-full bg-white/60"
            style={{ left: `${projecao}%` }}
            title={`Projeção: ${projecao}%`}
          />
        )}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-white/60">Atingimento: {atingimento}%</span>
        <span className="text-[10px] text-white/60">Projeção: {projecao}%</span>
      </div>
    </div>
  )
}
