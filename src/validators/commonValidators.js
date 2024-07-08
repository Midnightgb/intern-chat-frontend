import { required, email, minLength } from '@vuelidate/validators'

export const emailValidator = {
  required,
  email,
  // Validador personalizado
  customCompanyEmail: (value) => value.endsWith('@company.com') || 'Debe ser un correo de la empresa'
}

export const passwordValidator = {
  required,
  minLength: minLength(6)
}
