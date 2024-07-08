import { emailValidator, passwordValidator } from './commonValidators'

export const loginValidators = {
  email: emailValidator,
  password: passwordValidator
}