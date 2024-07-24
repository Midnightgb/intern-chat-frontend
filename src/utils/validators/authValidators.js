//src/utils/validators/authValidators.js
import { networkUserValidator, passwordValidator } from './commonValidators'

export const authValidators = {
  network_user: networkUserValidator,
  password: passwordValidator
}
