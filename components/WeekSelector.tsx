'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

interface Props {
  weeks: string[]
  selected: string
}

export function WeekSelector({ weeks, selected }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const select = (week: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('semana', week)
    startTransition(() => {
      router.push(`/?${params.toString()}`, { scroll: false })
    })
  }

  if (weeks.length === 0) return null

  return (
    <div className="flex items-center gap-1.5 flex-shrink-0">
      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mr-0.5">
        Semana
      </span>
      {weeks.map(w => (
        <button
          key={w}
          onClick={() => select(w)}
          disabled={isPending}
          className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
            w === selected
              ? 'bg-gupy-azul-escuro text-gupy-verde'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          {w}
        </button>
      ))}
      <span className="w-px h-4 bg-gray-200 mx-1 flex-shrink-0" />
    </div>
  )
}
