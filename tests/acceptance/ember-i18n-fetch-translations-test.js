import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | ember i18n fetch translations', function(hooks) {
    setupApplicationTest(hooks);

    test('visiting /ember-i18n-fetch-translations', async function(assert) {
        assert.expect(1);
        await visit('/');
        assert.equal(this.element.querySelector('div[data-illumination]').textContent, 'Blinkende lygter');
    });

    test('visiting /ember-i18n-fetch-translations seeing additional translation files merged in', async function(assert) {
        assert.expect(1);
        await visit('/');
        assert.equal(this.element.querySelector('div[data-recruiterEmailGreeting]').textContent, 'Jeg håber du har det godt');
    });

    test('visiting /ember-i18n-fetch-translations seeing additional translation files merged over', async function(assert) {
        assert.expect(1);
        await visit('/');
        assert.equal(this.element.querySelector('div[data-greeting]').textContent, 'Næhmen hallo dér!');
    });
});
