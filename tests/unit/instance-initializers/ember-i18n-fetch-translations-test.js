import Application from '@ember/application';
import { run } from '@ember/runloop';
import { initialize } from 'dummy/instance-initializers/ember-i18n-fetch-translations';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';

module('Unit | Instance Initializer | ember i18n fetch translations', {
  beforeEach() {
    run(() => {
      this.application = Application.create();
      this.application.register('config:environment', {
        'ember-i18n-fetch-translations': {
          namespace: '',
        }
      });
      const config = this.application.resolveRegistration('config:environment');
      const ewConfig = config['ember-i18n-fetch-translations'];
      localStorage.setItem(`ember-i18n-fetch-translations-${ewConfig.namespace}`, JSON.stringify({
        en: {},
        de: {},
        fr: {}
      }))
      this.appInstance = this.application.buildInstance();
    });
  },
  afterEach() {
    const config = this.appInstance.resolveRegistration('config:environment');
    const ewConfig = config['ember-i18n-fetch-translations'];
    localStorage.removeItem(`ember-i18n-fetch-translations-${ewConfig.namespace}`)
    run(this.appInstance, 'destroy');
    destroyApp(this.application);
  }
});

// Replace this with your real tests.
test('it registers translations from localStorage', function(assert) {
  assert.expect(3);
  this.application.register('service:i18n', {
    addTranslations: function(language) {
      assert.ok(true, `it registers "${language}"`);
    }
  }, {
    instantiate: false
  });

  initialize(this.appInstance);
});
