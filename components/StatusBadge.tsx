import { statusDotClass, statusTextClass, statusBorderClass } from '@/lib/design-tokens'

interface Props {
  status: string
  label: string
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, label, size = 'md' }: Props) {
  const dot    = statusDotClass[status]    ?? 'bg-gray-400'
  const text   = statusTextClass[status]   ?? 'text-gray-600'
  const border = statusBorderClass[status] ?? 'border-gray-400'

  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${padding} ${text} ${border} bg-white`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
      {label}
    </span>
  )
}
