import Ember from 'ember';
import fetch from 'fetch';
import { all, hash } from 'rsvp';

export function initialize(application) {
  application.deferReadiness();
  const config = application.resolveRegistration('config:environment');
  const ewConfig = config['ember-i18n-fetch-translations'];

  if (ewConfig === undefined || ewConfig.namespace === undefined) {
    Ember.Logger.error(
      "No namespace set for `ember-i18n-fetch-translations`, don`t know how to access translations endpoint.\n" +
      "Please add a configuration block to your Ember configuration file `config/environment.js`.\n" +
      "ENV['ember-i18n-fetch-translations'] = {\n" +
      "  namespace: '<APPLICATION_NAME>/locales/'\n" +
      "};"
    );
    return
  }

  if (ewConfig === undefined || ewConfig.locales === undefined) {
    Ember.Logger.error(
      "No locales specified for `ember-i18n-fetch-translations`, don`t know how to access translations.\n" +
      "Please add a configuration block to your Ember configuration file `config/environment.js`.\n" +
      "ENV['ember-i18n-fetch-translations'] = {\n" +
      "  locales: ['en', 'de']\n" +
      "};"
    );
    return
  }

  const promises = ewConfig.locales.map((locale) => {
    return fetch(`${ewConfig.namespace}/locales/${locale}/translations.json`)
    .then((response) => {
      return hash({
        locale: locale,
        translations: response.json()
      });
    });
  });

  all(promises)
  .then((responses) => {
    let locales = {};
    responses.forEach(({locale, translations}) => {
      locales[locale] = translations;
    });
    localStorage.setItem(`ember-i18n-fetch-translations-${ewConfig.namespace}`, JSON.stringify(locales));
  })
  .finally(() => {
    application.advanceReadiness();
  });
}

export default {
  initialize
};
