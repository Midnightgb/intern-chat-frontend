import { networkUserValidator, passwordValidator } from './commonValidators'

export const loginValidators = {
  network_user: networkUserValidator,
  password: passwordValidator
}