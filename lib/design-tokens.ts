export const colors = {
  azulEscuro: '#00122f',
  anil:       '#003cfd',
  anilClaro:  '#5174fe',
  verde:      '#cdff82',
  verdeEscuro:'#82c500',
  verdeClaro: '#e6ffac',
  lilas:      '#9e88ff',
  laranja:    '#ff5c1d',
  laranjaEscuro: '#db4d23',
  laranjaClaro:  '#fe9d81',
}

export const statusColors: Record<string, { dot: string; bg: string; text: string; border: string }> = {
  'on-track': {
    dot:    colors.verdeEscuro,
    bg:     '#f0fff0',
    text:   colors.verdeEscuro,
    border: colors.verdeEscuro,
  },
  atencao: {
    dot:    colors.laranja,
    bg:     '#fff5f0',
    text:   colors.laranjaEscuro,
    border: colors.laranja,
  },
  risco: {
    dot:    colors.laranjaEscuro,
    bg:     '#fff0ee',
    text:   colors.laranjaEscuro,
    border: colors.laranjaEscuro,
  },
  concluido: {
    dot:    colors.anil,
    bg:     '#f0f4ff',
    text:   colors.anil,
    border: colors.anil,
  },
}

export const statusDotClass: Record<string, string> = {
  'on-track': 'bg-gupy-verde-escuro',
  atencao:    'bg-gupy-laranja',
  risco:      'bg-gupy-laranja-escuro',
  concluido:  'bg-gupy-anil',
}

export const statusTextClass: Record<string, string> = {
  'on-track': 'text-gupy-verde-escuro',
  atencao:    'text-gupy-laranja-escuro',
  risco:      'text-gupy-laranja-escuro',
  concluido:  'text-gupy-anil',
}

export const statusBorderClass: Record<string, string> = {
  'on-track': 'border-gupy-verde-escuro',
  atencao:    'border-gupy-laranja',
  risco:      'border-gupy-laranja-escuro',
  concluido:  'border-gupy-anil',
}
