import Link from 'next/link'
import { Suspense } from 'react'
import { CommentsConsolidated } from '@/components/CommentsConsolidated'

export const dynamic = 'force-dynamic'

export default function ComentariosPage() {
  return (
    <>
      {/* Simple header */}
      <header className="border-b border-gray-100 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gupy-anil text-lg">gupy</span>
            <span className="w-px h-5 bg-gray-200" />
            <span className="text-sm font-medium text-gray-700">Comentários</span>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-gupy-anil hover:text-gupy-anil-claro transition-colors"
          >
            ← Voltar ao hub
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-xl font-semibold">
            <span className="text-gupy-anil">Comentários</span>
            <span className="text-gray-800"> — todas as frentes</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Agrupados por frente, ordenados pelo mais recente.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="text-center py-20 text-gray-400 text-sm">
              Carregando comentários…
            </div>
          }
        >
          <CommentsConsolidated />
        </Suspense>
      </main>
    </>
  )
}
