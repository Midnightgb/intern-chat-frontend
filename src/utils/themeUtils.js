import { ref, watch } from 'vue'

const theme = ref('system')

const applyTheme = (newTheme) => {
  if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const toggleTheme = (value) => {
  theme.value = value
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

// Aplicar el tema inicial
applyTheme(theme.value)

// Observar cambios en el tema
watch(theme, (newTheme) => {
  applyTheme(newTheme)
})

export { theme, toggleTheme }