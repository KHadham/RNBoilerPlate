import I18n from 'react-native-i18n';

const en = require('./locales/en.json');
const id = require('./locales/id.json');

I18n.fallbacks = true;
I18n.translations = {
  en,
  id
};

export const switchLanguage = (language, component) => {
  I18n.locale = language;
  if (component) {
    component.forceUpdate();
  }
};

export const isEnglish = () => {
  if (I18n.locale === 'en') {
    return true;
  }
  return false;
};

export default I18n;
