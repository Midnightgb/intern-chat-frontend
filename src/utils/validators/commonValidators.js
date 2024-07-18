// src/utils/validators/commonValidators.js
import { required, minLength } from '@vuelidate/validators'
import { createI18nMessage } from '@vuelidate/validators'
import { messages } from './validationMessages'

const i18n = {
  t: (key, params) => {
    const keys = key.split('.');
    let message = messages.es;
    for (const k of keys) {
      if (message && message[k]) {
        message = message[k];
      } else {
        console.warn(`Missing translation for key: ${key}`);
        return key; // Return the key if translation is missing
      }
    }
    if (typeof message === 'string') {
      return message.replace(/{(\w+)}/g, (match, p1) => params[p1] || match);
    }
    return key;
  }
}

console.log(messages.es);
const withI18nMessage = createI18nMessage({ t: i18n.t })

const requiredEs = withI18nMessage(required)
const minLengthEs = (min) => withI18nMessage(minLength(min))

export const networkUserValidator = {
  required: requiredEs,
  minLength: minLengthEs(2)
}

export const passwordValidator = {
  required: requiredEs,
  minLength: minLengthEs(2)
}