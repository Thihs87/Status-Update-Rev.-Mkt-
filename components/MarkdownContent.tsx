'use client'

import { createContext, useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface Props {
  content: string
}

const IsOrderedCtx = createContext(false)

function CheckIcon() {
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gupy-verde-escuro text-white flex-shrink-0 mt-0.5">
      <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 5l2.5 2.5L8 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function ClockIcon() {
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5">
      <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none" stroke="currentColor">
        <circle cx="5" cy="5" r="3.5" strokeWidth="1.5" />
        <path d="M5 3v2.2l1.3.9" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function OlItem({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <li className="flex items-start gap-2.5 list-none">
      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gupy-verde flex items-center justify-center text-[10px] font-bold text-gupy-azul-escuro mt-0.5">
        {index + 1}
      </span>
      <span className="text-sm text-gray-700 leading-relaxed flex items-start gap-1.5 flex-wrap">
        {children}
      </span>
    </li>
  )
}

function UlItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 list-none text-sm text-gray-700 leading-relaxed">
      <span className="text-gupy-verde-escuro flex-shrink-0 mt-1 text-xs">–</span>
      <span className="flex items-start gap-1.5 flex-wrap">{children}</span>
    </li>
  )
}

function ListItem({ children, index }: any) {
  const isOrdered = useContext(IsOrderedCtx)
  if (isOrdered) return <OlItem index={index ?? 0}>{children}</OlItem>
  return <UlItem>{children}</UlItem>
}

function processContent(raw: string): string {
  return raw
    .replace(/✅\s*/g, '<checkmark></checkmark>')
    .replace(/⏳\s*/g, '<clockmark></clockmark>')
}

export function MarkdownContent({ content }: Props) {
  const processed = processContent(content)

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        checkmark: () => <CheckIcon />,
        clockmark: () => <ClockIcon />,

        h2: ({ children }: any) => (
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mt-6 mb-2 first:mt-0">
            {children}
          </h2>
        ),
        h3: ({ children }: any) => (
          <h3 className="text-sm font-semibold text-gray-700 mt-5 mb-2">{children}</h3>
        ),
        h4: ({ children }: any) => (
          <h4 className="text-xs font-semibold text-gray-600 mt-3 mb-1">{children}</h4>
        ),
        p: ({ children }: any) => (
          <p className="text-sm text-gray-700 leading-relaxed mb-3">{children}</p>
        ),
        ul: ({ children }: any) => (
          <IsOrderedCtx.Provider value={false}>
            <ul className="space-y-1.5 mb-4">{children}</ul>
          </IsOrderedCtx.Provider>
        ),
        ol: ({ children }: any) => (
          <IsOrderedCtx.Provider value={true}>
            <ol className="space-y-2 mb-4">{children}</ol>
          </IsOrderedCtx.Provider>
        ),
        li: ListItem,
        strong: ({ children }: any) => (
          <strong className="font-semibold text-gray-900">{children}</strong>
        ),
        a: ({ href, children }: any) => (
          <a href={href} className="text-gupy-anil hover:underline">{children}</a>
        ),
        blockquote: ({ children }: any) => (
          <blockquote className="border-l-2 border-gupy-anil pl-4 my-3 text-gray-600 text-sm">
            {children}
          </blockquote>
        ),
        table: ({ children }: any) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }: any) => (
          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-50 border-b border-gray-200">
            {children}
          </th>
        ),
        td: ({ children }: any) => (
          <td className="px-3 py-2 text-gray-700 border-b border-gray-100">{children}</td>
        ),
      } as any}
    >
      {processed}
    </ReactMarkdown>
  )
}
