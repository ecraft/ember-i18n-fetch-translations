export function initialize(appInstance) {
  const i18n = appInstance.lookup('service:i18n');
  const config = appInstance.resolveRegistration('config:environment');
  const ewConfig = config['ember-i18n-fetch-translations'];

  const translations = JSON.parse(localStorage.getItem(`ember-i18n-fetch-translations-${ewConfig.namespace}`));
  Object.keys(translations).forEach((locale) => {
    i18n.addTranslations(locale, translations[locale]);
  });
}

export default {
  initialize
};
