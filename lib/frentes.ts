import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const frentesDir = path.join(process.cwd(), 'content', 'frentes')

export interface Metrica {
  label: string
  valor: string
  atingimento: number
  projecao: number
  unidade: string
}

export interface Canal {
  canal: string
  atingimento: string
  valor: number
  status: string
  observacao?: string
}

export interface ResumoSection {
  atingimento: number
  bullets: string[]
  canais: Canal[]
}

export interface ResumoExecutivoData {
  id: string
  tipo: 'resumo-executivo'
  title: string
  subtitle: string
  status: string
  statusLabel: string
  updatedAt: string
  semana: string
  opp: ResumoSection
  pipeline: ResumoSection
}

export interface FrenteData {
  id: string
  slug: string
  title: string
  subtitle?: string
  status: 'on-track' | 'atencao' | 'risco' | 'concluido'
  statusLabel: string
  ordem: number
  semana: string
  alerta?: string
  metricas?: Metrica[]
  tese?: string
  content: string
}

export function getResumoExecutivo(semana?: string): ResumoExecutivoData | null {
  const filePath = path.join(frentesDir, 'resumo-executivo.mdx')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  const resumo = data as ResumoExecutivoData
  if (semana && resumo.semana !== semana) return null
  return resumo
}

export function getFrenteBySlug(slug: string): FrenteData {
  const filePath = path.join(frentesDir, `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { ...data, content: content.trim() } as FrenteData
}

export function getAllFrentes(semana?: string): FrenteData[] {
  const files = fs.readdirSync(frentesDir)
  const all = files
    .filter(f => f.endsWith('.mdx') && f !== 'resumo-executivo.mdx')
    .map(f => getFrenteBySlug(f.replace('.mdx', '')))
    .sort((a, b) => a.ordem - b.ordem)
  if (!semana) return all
  return all.filter(f => f.semana === semana)
}

export function getAvailableWeeks(): string[] {
  const files = fs.readdirSync(frentesDir).filter(f => f.endsWith('.mdx'))
  const weeks = new Set<string>()

  // Include resumo-executivo semana
  try {
    const resumoPath = path.join(frentesDir, 'resumo-executivo.mdx')
    const { data } = matter(fs.readFileSync(resumoPath, 'utf8'))
    if (data.semana) weeks.add(data.semana as string)
  } catch {}

  for (const f of files.filter(f => f !== 'resumo-executivo.mdx')) {
    const { data } = matter(fs.readFileSync(path.join(frentesDir, f), 'utf8'))
    if (data.semana) weeks.add(data.semana as string)
  }

  // Sort descending so latest is first
  return Array.from(weeks).sort((a, b) => b.localeCompare(a))
}

export const FRENTE_LABELS: Record<string, string> = {
  'campanhas-comerciais':      'Campanhas',
  'pipeline-grandes-contas':   'Grandes Contas',
  'patrocinios-2026':          'Patrocínios',
  'estrategia-enterprise':     'Enterprise',
  'midia-paga':                'Mídia Paga',
  'diagnostico-middle-market': 'Middle Market',
  'albacross':                 'Albacross',
  'plano-inhire':              'Inhire',
}
