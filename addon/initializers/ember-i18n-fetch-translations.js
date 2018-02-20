import { assert } from '@ember/debug';
import { merge } from 'lodash';
import fetch from 'fetch';
import { all, hash, reject } from 'rsvp';

export function initialize(application) {
  application.deferReadiness();
  const config = application.resolveRegistration('config:environment');
  const ewConfig = config['ember-i18n-fetch-translations'];

  assert(
    "No namespace set for `ember-i18n-fetch-translations`, don`t know how to access translations endpoint.\n" +
    "Please add a configuration block to your Ember configuration file `config/environment.js`.\n" +
    "ENV['ember-i18n-fetch-translations'] = {\n" +
    "  namespace: '<APPLICATION_NAME>/locales/'\n" +
    "};"
  , ewConfig !== undefined && ewConfig.namespace !== undefined);


  assert(
    "No locales specified for `ember-i18n-fetch-translations`, don`t know how to access translations.\n" +
    "Please add a configuration block to your Ember configuration file `config/environment.js`.\n" +
    "ENV['ember-i18n-fetch-translations'] = {\n" +
    "  locales: ['en', 'de']\n" +
    "};"
  , ewConfig !== undefined && ewConfig.locales !== undefined);

  if (!ewConfig.fileNames || ewConfig.fileNames.length === 0) {
    ewConfig.fileNames = ['translations.json'];
  }

  let allPromises = [];
  let promises;
  ewConfig.fileNames.forEach((fileName) => {
    promises = ewConfig.locales.map((locale) => {
      const url = `${ewConfig.namespace}/locales/${locale}/${fileName}`;
      return fetch(url)
        .then((response) => {
          if (response.ok) {
            return hash({
              locale: locale,
              translations: response.json()
            });
          }

          const existingTranslation = localStorage.getItem(`ember-i18n-fetch-translations-${ewConfig.namespace}.${locale}`);
          if (existingTranslation) {
            return hash({
              locale: locale,
              translations: existingTranslation
            });
          }
          assert(`Endpoint at ${url} returns 404, are you sure you configured the namespace correctly?`, response.status !== 404);
          assert('Could not fetch translation and no cached translations found in localStorage.');
      })
      .catch((error) => {
        assert(`Could not fetch translation: ${error}`);
        reject()
      })
    });
    allPromises = allPromises.concat(promises);
  });

  all(allPromises)
  .then((responses) => {
    let locales = {};
    responses.forEach(({locale, translations}) => {
      if (!locales[locale]) {
        locales[locale] = {}
      }
      locales[locale] = merge(locales[locale], translations);
    });
    localStorage.setItem(`ember-i18n-fetch-translations-${ewConfig.namespace}`, JSON.stringify(locales));
  })
  .catch(() => {
  })
  .finally(() => {
    application.advanceReadiness();
  });
}

export default {
  initialize
};
