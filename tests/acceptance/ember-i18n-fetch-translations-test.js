import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | ember i18n fetch translations', function(hooks) {
    setupApplicationTest(hooks);

    test('visiting /ember-i18n-fetch-translations', async function(assert) {
        await visit('/');
        assert.equal(this.element.querySelector('div[data-illumination]').textContent, 'Blinkenlichts');
    });
});
