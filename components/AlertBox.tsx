interface Props {
  message: string
}

export function AlertBox({ message }: Props) {
  return (
    <div className="flex items-start gap-3 rounded-card border border-gupy-laranja bg-[#fff5f0] px-4 py-3 mb-5">
      <svg
        className="w-4 h-4 text-gupy-laranja flex-shrink-0 mt-0.5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-sm font-medium text-gupy-laranja-escuro leading-snug">{message}</p>
    </div>
  )
}
