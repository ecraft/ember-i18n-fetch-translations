import Application from '@ember/application';
import { run } from '@ember/runloop';

import { initialize } from 'dummy/initializers/ember-i18n-fetch-translations';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';

module('Unit | Initializer | ember i18n fetch translations', {
  beforeEach() {
    run(() => {
      this.application = Application.create();
      this.application.register('config:environment', {
        'ember-i18n-fetch-translations': {
          namespace: '',
          locales: ['en', 'de']
        }
      });
      this.application.deferReadiness();
    });
  },
  afterEach() {
    const config = this.application.resolveRegistration('config:environment');
    const ewConfig = config['ember-i18n-fetch-translations'];
    localStorage.removeItem(`ember-i18n-fetch-translations-${ewConfig.namespace}`)
    destroyApp(this.application);
  }
});

test('it stores translations in localStorage', function(assert) {
  initialize(this.application);
  const config = this.application.resolveRegistration('config:environment');
  const ewConfig = config['ember-i18n-fetch-translations'];
  assert.ok(localStorage.getItem(`ember-i18n-fetch-translations-${ewConfig.namespace}`));
});

test('it warns if endpoint returns 404', function(assert) {
  assert.expect(1);
  const config = this.application.resolveRegistration('config:environment');
  const ewConfig = config['ember-i18n-fetch-translations'];
  ewConfig.namespace = 'nonexistant';
  assert.throws(initialize(this.application));
});

test('it succeeds if no endpoint is available if translations exist in localStorage', function(assert) {
  const config = this.application.resolveRegistration('config:environment');
  const ewConfig = config['ember-i18n-fetch-translations'];
  ewConfig.namespace = 'nonexistant';
  localStorage.setItem(`ember-i18n-fetch-translations-${ewConfig.namespace}`, JSON.stringify({
    en: {},
    de: {}
  }))
  initialize(this.application)
  assert.ok(true)
});

test('it fails if no endpoint is available with no translations in localStorage', function(assert) {
  assert.expect(1);
  const config = this.application.resolveRegistration('config:environment');
  const ewConfig = config['ember-i18n-fetch-translations'];
  ewConfig.namespace = 'http://127.0.0.1/';
  assert.throws(initialize(this.application));
});
