# Hub de Projetos — Growth & Revenue Marketing · Gupy

Site estático interno para o CMO acompanhar projetos de marketing em andamento.
Acesso via link direto (não indexado).

---

## Rodando localmente

```bash
# 1. Instalar dependências
npm install

# 2. Criar variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local com suas credenciais Supabase

# 3. Iniciar servidor de desenvolvimento
npm run dev
# Acesse: http://localhost:3000
```

---

## Editando conteúdo

Todos os textos ficam em `/content/frentes/`. Cada arquivo `.mdx` tem:

- **Front-matter YAML** (entre `---`): metadados como status, título, alertas e métricas
- **Corpo markdown**: conteúdo livre com seções `## Heading`, listas, bold

### Trocar o status de uma frente

Abra o arquivo `.mdx` correspondente e altere o campo `status` e `statusLabel`:

| status       | statusLabel  |
|-------------|--------------|
| `on-track`  | `On track`   |
| `atencao`   | `Atenção`    |
| `risco`     | `Risco`      |
| `concluido` | `Concluído`  |

### Adicionar alerta laranja

```yaml
alerta: "Texto do alerta aparece em destaque laranja no topo do bloco"
```

### Adicionar métricas (faixa preta)

```yaml
metricas:
  - label: "MQL"
    valor: "150"
    atingimento: 60   # % atual
    projecao: 80      # % projetada
    unidade: "%"
```

### Adicionar nova frente

1. Crie `/content/frentes/meu-slug.mdx`
2. Adicione o front-matter com `ordem` maior que a última frente
3. Adicione o slug em `FRENTE_LABELS` em `/lib/frentes.ts`

---

## Configurando Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um novo projeto
2. No painel do projeto: **Settings → API**
3. Copie `Project URL` e `anon public` key
4. Crie `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui
```

5. No **SQL Editor** do Supabase, rode:

```sql
create table comments (
  id uuid default gen_random_uuid() primary key,
  frente_slug text not null,
  author text default 'CMO',
  content text not null,
  created_at timestamptz default now()
);

create index idx_comments_frente_slug on comments(frente_slug);
create index idx_comments_created_at on comments(created_at desc);

alter table comments enable row level security;

create policy "Public read"   on comments for select using (true);
create policy "Public insert" on comments for insert with check (true);
```

---

## Deploy na Vercel

1. Faça push do repositório para o GitHub (conta pessoal)
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Clique em **Deploy** — a Vercel detecta Next.js automaticamente
5. Deploy automático ativado a cada push na branch `main`

---

## Checklist de não-indexação

- [x] `public/robots.txt` com `Disallow: /`
- [x] Meta tag `<meta name="robots" content="noindex, nofollow">` no `layout.tsx`
- [x] Campo `robots` no `metadata` do Next.js com `index: false, follow: false`

---

## Visualizando comentários

- **No site**: acesse `/comentarios` — todos os comentários agrupados por frente
- **Export manual**: no painel Supabase → Table Editor → `comments` → Export CSV
- **SQL rápido** para ver tudo:
  ```sql
  select * from comments order by created_at desc;
  ```
