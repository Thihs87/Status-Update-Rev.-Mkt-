'use server'

import { revalidatePath } from 'next/cache'
import { insertComment } from '@/lib/supabase'

export async function addComment(
  frenteSlug: string,
  content: string,
  author: string
): Promise<{ error: string | null }> {
  if (!content.trim()) return { error: 'Conteúdo vazio' }

  const result = await insertComment(frenteSlug, content.trim(), author || 'CMO')

  if (!result.error) {
    revalidatePath('/')
    revalidatePath('/comentarios')
  }

  return result
}
