import { ref, watch } from 'vue'

const theme = ref(null)

const applyTheme = (newTheme) => {
  if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const toggleTheme = (value) => {
  theme.value = value
  localStorage.setItem('userTheme', value)
  applyTheme(theme.value)
}

const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const initializeTheme = () => {
  // Intentamos obtener el tema guardado del localStorage
  const savedTheme = localStorage.getItem('userTheme')
  if (savedTheme) {
    // Si hay un tema guardado, lo usamos
    theme.value = savedTheme
  } else {
    // Si no hay tema guardado, usamos el tema del sistema
    theme.value = getSystemTheme()
  }
  applyTheme(theme.value)
}

// Observar cambios en la preferencia del sistema
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
const handleMediaQueryChange = (e) => {
  if (theme.value === 'system') {
    applyTheme(e.matches ? 'dark' : 'light')
  }
}

mediaQuery.addEventListener('change', handleMediaQueryChange)

initializeTheme()

watch(theme, (newTheme) => {
  applyTheme(newTheme)
})

export { theme, toggleTheme }