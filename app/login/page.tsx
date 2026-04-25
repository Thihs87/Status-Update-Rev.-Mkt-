import { login } from '@/app/actions/auth'

interface Props {
  searchParams: { error?: string }
}

export default function LoginPage({ searchParams }: Props) {
  return (
    <div className="min-h-screen bg-gupy-azul-escuro flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-gupy-anil text-gupy-verde text-xs font-semibold tracking-wide mb-4">
            Gupy
          </span>
          <h1 className="text-white text-2xl font-bold">Hub de Projetos</h1>
          <p className="text-gray-400 text-sm mt-1">Growth & Revenue Marketing</p>
        </div>

        <form action={login} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          {searchParams.error && (
            <p className="text-red-400 text-sm text-center">
              E-mail ou senha incorretos.
            </p>
          )}

          <div className="space-y-1">
            <label className="text-gray-300 text-xs font-medium">E-mail</label>
            <input
              type="email"
              name="email"
              required
              placeholder="seu@gupy.com.br"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gupy-verde focus:ring-1 focus:ring-gupy-verde"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 text-xs font-medium">Senha</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gupy-verde focus:ring-1 focus:ring-gupy-verde"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gupy-verde text-gupy-azul-escuro font-semibold text-sm rounded-lg py-2.5 hover:brightness-110 transition-all"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
