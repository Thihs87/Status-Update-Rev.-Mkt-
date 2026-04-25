import { createClient } from '@supabase/supabase-js'

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export interface Comment {
  id: string
  frente_slug: string
  author: string
  content: string
  created_at: string
}

export async function getCommentsByFrente(slug: string): Promise<Comment[]> {
  const client = getClient()
  if (!client) return []
  const { data, error } = await client
    .from('gupy_hub_comments')
    .select('*')
    .eq('frente_slug', slug)
    .order('created_at', { ascending: false })
  if (error) { console.error('getCommentsByFrente:', error); return [] }
  return data ?? []
}

export async function getAllComments(): Promise<Comment[]> {
  const client = getClient()
  if (!client) return []
  const { data, error } = await client
    .from('gupy_hub_comments')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) { console.error('getAllComments:', error); return [] }
  return data ?? []
}

export async function insertComment(
  frenteSlug: string,
  content: string,
  author: string
): Promise<{ error: string | null }> {
  const client = getClient()
  if (!client) return { error: 'Supabase não configurado' }
  const { error } = await client
    .from('gupy_hub_comments')
    .insert({ frente_slug: frenteSlug, content, author })
  if (error) return { error: error.message }
  return { error: null }
}
