import { required, minLength } from '@vuelidate/validators'

export const networkUserValidator = {
  required,
  minLength: minLength(2),
}

export const passwordValidator = {
  required,
  minLength: minLength(2)
}