import { REGEX } from '../constants';

import I18n from '../i18n';

export function validateEmail(text) {
  let result;
  if (!REGEX.email.test(text)) {
    result = false;
  } else {
    result = true;
  }
  return result;
}

export function validatePassword(text) {
  if (text === '') {
    return I18n.t('error.passwordCantBeEmpty');
  } else if (text.length < 6) {
    return I18n.t('error.passwordAtLeastSix');
  }
  if (!REGEX.number.test(text)) {
    return I18n.t('error.passwordMustHaveAlphanumeric');
  }
  if (!REGEX.alphabet.test(text)) {
    return I18n.t('error.passwordMustHaveAlphanumeric');
  }
  return null;
}

export function validateFullName(text) {
  if (text.length < 3) {
    if (text === '') {
      return I18n.t('error.fullNameCantBeEmpty');
    }
    return I18n.t('error.fullNameAtLeastThree');
  }
  if (!REGEX.alphabetWithoutSpecialCharacter.test(text)) {
    return I18n.t('error.fullNameMustAlphabet');
  }
  return null;
}

export function validatePhoneNumber(text) {
  if (text === '') {
    return I18n.t('error.phoneNumberCantBeEmpty');
  } else if (text.length < 9) {
    return I18n.t('error.phoneNumberAtLeastNine');
  }
  return null;
}

export function validateCompanyName(nipnas) {
  if (nipnas === 0) {
    return `*${I18n.t('error.companyNotFound')}`;
  }
  return null;
}

export function validateForm(text) {
  if (text === '') {
    return I18n.t('error.formCantBeEmpty');
  }
  return null;
}

export function validateDate(text) {
  if (text == 'Invalid date') {
    return '';
  } else {
    return text;
  }
}

export function validateNull(text) {
  if (text == null || text == '' || text == 'Invalid date') {
    return '-';
  } else {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

export function validateString(text) {
  if (text == null || text == 'Invalid date') {
    return '';
  } else {
    return text;
  }
}
