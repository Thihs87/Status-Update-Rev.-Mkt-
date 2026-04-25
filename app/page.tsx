import { getAllFrentes, getResumoExecutivo, getAvailableWeeks, FRENTE_LABELS } from '@/lib/frentes'
import { getCommentsByFrente } from '@/lib/supabase'
import { Header } from '@/components/Header'
import { AnchorNav } from '@/components/AnchorNav'
import { ResumoExecutivo } from '@/components/ResumoExecutivo'
import { FrenteBlock } from '@/components/FrenteBlock'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: { semana?: string }
}

export default async function HomePage({ searchParams }: Props) {
  const availableWeeks = getAvailableWeeks()
  const selectedWeek   = searchParams.semana ?? availableWeeks[0] ?? 'W0.04'

  const frentes = getAllFrentes(selectedWeek)
  const resumo  = getResumoExecutivo(selectedWeek)

  const commentsEntries = await Promise.all(
    frentes.map(async f => [f.slug, await getCommentsByFrente(f.slug)] as const)
  )
  const commentsMap = Object.fromEntries(commentsEntries)

  const navItems = [
    ...(resumo ? [{ id: 'resumo-executivo', label: 'Resumo Executivo' }] : []),
    ...frentes.map(f => ({ id: f.slug, label: FRENTE_LABELS[f.slug] ?? f.title })),
  ]

  // Date label from the selected week's resumo or first frente
  const updatedAt = resumo?.updatedAt
    ? new Date(resumo.updatedAt).toLocaleDateString('pt-BR')
    : '—'

  return (
    <>
      <Header updatedAt={updatedAt} />
      <AnchorNav items={navItems} weeks={availableWeeks} selectedWeek={selectedWeek} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16">
        {/* Week badge above content */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gupy-azul-escuro text-gupy-verde text-xs font-semibold tracking-wide">
            {selectedWeek}
          </span>
          <span className="text-xs text-gray-400">
            {frentes.length} frente{frentes.length !== 1 ? 's' : ''} · {updatedAt}
          </span>
        </div>

        {resumo && <ResumoExecutivo data={resumo} />}

        {resumo && <div className="my-8 border-t border-gray-200" />}

        {frentes.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">
            Nenhuma frente encontrada para <strong>{selectedWeek}</strong>.
          </div>
        ) : (
          frentes.map(frente => (
            <FrenteBlock
              key={frente.slug}
              frente={frente}
              initialComments={commentsMap[frente.slug] ?? []}
            />
          ))
        )}
      </main>
    </>
  )
}
