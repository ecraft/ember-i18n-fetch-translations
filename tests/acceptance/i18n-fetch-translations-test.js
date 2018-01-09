import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | i18n fetch translations');

test('visiting /i18n-fetch-translations', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('div[data-illumination]').text(), 'Blinkenlichts');
  });
});
