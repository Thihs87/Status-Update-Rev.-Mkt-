'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { WeekSelector } from './WeekSelector'

interface NavItem {
  id: string
  label: string
}

interface Props {
  items: NavItem[]
  weeks: string[]
  selectedWeek: string
}

export function AnchorNav({ items, weeks, selectedWeek }: Props) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')
  const pillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [items])

  useEffect(() => {
    const pill = pillsRef.current?.querySelector(`[data-id="${activeId}"]`) as HTMLElement | null
    pill?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeId])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-14 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div
        ref={pillsRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-2 py-2.5 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Week selector — only renders when Suspense resolves (needs useSearchParams) */}
        <Suspense fallback={
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mr-0.5">Semana</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gupy-azul-escuro text-gupy-verde flex-shrink-0">
              {selectedWeek}
            </span>
            <span className="w-px h-4 bg-gray-200 mx-1 flex-shrink-0" />
          </div>
        }>
          <WeekSelector weeks={weeks} selected={selectedWeek} />
        </Suspense>

        {/* Frente anchor pills */}
        {items.map(({ id, label }) => (
          <button
            key={id}
            data-id={id}
            onClick={() => scrollTo(id)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeId === id
                ? 'bg-gupy-anil text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  )
}
