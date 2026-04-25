import Link from 'next/link'

interface Props {
  updatedAt: string
}

export function Header({ updatedAt }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo + título */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex-shrink-0 font-semibold text-gupy-azul-escuro text-lg tracking-tight select-none">
            <span className="text-gupy-anil">gupy</span>
          </span>
          <span className="hidden sm:block w-px h-5 bg-gray-200" />
          <span className="hidden sm:block text-sm font-medium text-gray-700 truncate">
            Hub de Projetos — Growth &amp; Revenue Marketing
          </span>
        </div>

        {/* Direita */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="hidden md:block text-xs text-gray-400">
            Atualizado em {updatedAt}
          </span>
          <Link
            href="/comentarios"
            className="text-sm font-medium text-gupy-anil hover:text-gupy-anil-claro transition-colors"
          >
            Comentários
          </Link>
        </div>
      </div>
    </header>
  )
}
