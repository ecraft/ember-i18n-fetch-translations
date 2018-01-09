# i18n-fetch-translations

This Ember.js addon provides a way to get ember-i18n to load translations from the server instead of having them embedded in the app.

## Usage

* `ember install i18n-fetch-translations`
* Make sure you specify a list of the locales you want to support in your Ember configuration file `config/environment.js`.
  ```js
  ENV['i18n-fetch-translations'] = {
    locales: ['en', 'de']
  };
  ```
* Move locales to a folder called `/app/public/locales`, with one subfolder per locale.
* Convert any existing translation files from ES6 modules to json.

### Example locale file

`/app/public/locales/en/translations.json`:

```js
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
  },
  "models": {
    "packing-list": {
      "customer": "Customer",
      "customer-order": "Customer Order",
      "sender-name": "Name"
    }
  }
}
```

## Installation

* `git clone <repository-url>` this repository
* `cd i18n-fetch-translations`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

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
