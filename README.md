# Dictionary Management - OneDot

### Demo
https://stoico.github.io/dictionary-management/

# Tech stack
- ES6
- Vue.js
- Nuxt
- Vuex
- localStorage

# Functional Requirements
- Creating and deleting dictionaries
- Showing available dictionaries in an overview
- Editing dictionaries (adding, updating and removing rows) Validating the entire dictionary regarding consistency (see above)
- Validations should be shown as some kind of problem markers next to the offending part of the dictionary.
- Problem markers have different severities, e.g. Duplicates are less severe than a Cycle (in which case you cannot go on processing such a dictionary).
- Persisting dictionaries with validation errors for future editing

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
