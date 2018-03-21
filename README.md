[![CircleCI](https://circleci.com/gh/ecraft/ember-i18n-fetch-translations/tree/master.svg?style=svg)](https://circleci.com/gh/ecraft/ember-i18n-fetch-translations/tree/master)

# ember-i18n-fetch-translations

This Ember.js addon provides a way to get ember-i18n to load translations from the server instead of having them embedded in the app.

## Usage

* `ember install ember-i18n-fetch-translations`
* Make sure you specify a list of the locales you want to support in your Ember configuration file `config/environment.js`.

```js
ENV['ember-i18n-fetch-translations'] = {
    namespace: '<APPLICATION_NAME>',
    locales: ['en', 'de']
};
```
* Move locales to a folder called `/app/public/locales`, with one subfolder per locale.
* Convert any existing translation files from ES6 modules to JSON.

### Example locale file

`/app/public/locales/en/translations.json`:

```json
{
  "global": {
    "type-to-search": "Type to search...",
    "no-results-found": "No results found.",
    "search": "Search"
  },
  "ui": {
    "index": {
      "header": "The Header",
      "sender-address": "Sender Address",
      "receiver-address": "Receiver Address",
      "edit": "Edit"
    }
  }
}
```

### `fileNames` option

In case you have more than one translation file, you can _merge_ them on top of
each other. Here's how to configure that:

```js
ENV['ember-i18n-fetch-translations'] = {
    namespace: '<APPLICATION_NAME>',
    locales: ['en', 'de'],
    fileNames: ['factory_default_translations.json', 'translations.json']
};
```

This will fetch `factory_default_translations.json` first, for a locale, and
then amend those with the more specific translations in the file
`translations.json`.

The default value of `fileNames` is `['translations.json']`.

### `directoryMappings` option

In case your content for a general locale sits in an overly-specific file, you
can instruct this addon to load it into the general locale key:

```js
ENV['ember-i18n-fetch-translations'] = {
    namespace: '',
    locales: ['en', 'de'],
    directoryMappings: {
        'de': 'de-DE'
    }
};
```

So, the situation is that the files for the German translation are in a
directory `de-DE`, but we want the locale information to be loaded into `de`.

The default value of `directoryMappings` is `{}`.

## Development Setup

### Simple Installation

To add the ember-i18n-fetch-translations add-on to an existing project, enter this command from the root of your EmberJS project:

* `ember install ember-i18n-fetch-translations`

### Setting Up The Demo

If you'd like to the ember-i18n-fetch-translations for development, follow these steps:

* `git clone` this repository and enter its directory
* `npm install`
* `bower install`
* `ember serve`

If you now visit the dummy application, you should see it displaying a single translated word.

### Running Tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `npm test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Building

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Publishing

### First time

* Create a npm user account if you don't have one: `npm adduser`.
* Use `npm login` to store the credentials on the client.
* Ask an `@ecraft` npm organization admin to add you to the organization.

### Every time

* Make your changes
* `npm version <update_type>`, where update_type is one of the semantic versioning release types, patch, minor, or major. This command will change the version number in package.json. Note that this will also add a tag with this release number to your git repository.
* `git push`
* `npm publish`
* Give yourself a pat on the back
