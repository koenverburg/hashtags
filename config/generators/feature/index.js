const path = require('path')
const { trimTemplateFile, toTitleCase } = require('../utils/')

module.exports = {
  description: 'Generate a feature',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the feature?',
      default: 'Post',
      validate: value => {
        if (/.+/.test(value)) {
          return true
        }
        return 'The name is required.'
      },
    },
  ],
  actions: data => {
    return [
      {
        type: 'add',
        path: path.resolve(`./app/react/features/${toTitleCase(data.name)}/index.tsx`),
        templateFile: './feature/es6class.js.hbs',
        abortOnFail: true,
      },

      // redux files
      {
        type: 'add',
        path: path.resolve(
          `./app/react/features/${toTitleCase(data.name)}/redux/${toTitleCase(
            data.name,
          )}.constants.ts`,
        ),
        templateFile: './feature/redux/constants.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve(
          `./app/react/features/${toTitleCase(data.name)}/redux/${toTitleCase(
            data.name,
          )}.actions.ts`,
        ),
        templateFile: './feature/redux/actions.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve(
          `./app/react/features/${toTitleCase(data.name)}/redux/${toTitleCase(
            data.name,
          )}.reducer.ts`,
        ),
        templateFile: './feature/redux/reducer.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve(
          `./app/react/features/${toTitleCase(data.name)}/redux/${toTitleCase(
            data.name,
          )}.selectors.ts`,
        ),
        templateFile: './feature/redux/selectors.js.hbs',
        abortOnFail: true,
      },

      // redux saga
      {
        type: 'add',
        path: path.resolve(
          `./app/react/features/${toTitleCase(data.name)}/saga/${toTitleCase(
            data.name,
          )}.watcher.ts`,
        ),
        templateFile: './feature/saga/watcher.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve(
          `./app/react/features/${toTitleCase(data.name)}/saga/${toTitleCase(
            data.name,
          )}.get.saga.ts`,
        ),
        templateFile: './feature/saga/saga.get.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve(
          `./app/react/features/${toTitleCase(data.name)}/${toTitleCase(data.name)}.api.ts`,
        ),
        templateFile: './feature/api.js.hbs',
        abortOnFail: true,
      },

      // index files, and register reducer + saga
      {
        type: 'modify',
        path: path.resolve(`./app/react/features/index.ts`),
        pattern: /(\/\* GENERATOR-IMPORT \*\/)/g,
        template: trimTemplateFile('./config/generators/feature/import-class.hbs'),
        abortOnFail: false,
      },
      {
        type: 'modify',
        path: path.resolve(`./app/react/RootReducer.ts`),
        pattern: /(\/\* GENERATOR-IMPORT-REDUCER \*\/)/g,
        template: trimTemplateFile('./config/generators/feature/import-reducer.hbs'),
        abortOnFail: false,
      },
      {
        type: 'modify',
        path: path.resolve(`./app/react/RootReducer.ts`),
        pattern: /(\/\* GENERATOR-REGISTER-REDUCER \*\/)/g,
        template: trimTemplateFile('./config/generators/feature/register-reducer.hbs'),
        abortOnFail: false,
      },
      {
        type: 'modify',
        path: path.resolve(`./app/react/RootSaga.ts`),
        pattern: /(\/\* GENERATOR-IMPORT-SAGA \*\/)/g,
        template: trimTemplateFile('./config/generators/feature/import-saga.hbs'),
        abortOnFail: false,
      },
      {
        type: 'modify',
        path: path.resolve(`./app/react/RootSaga.ts`),
        pattern: /(\/\* GENERATOR-REGISTER-SAGA \*\/)/g,
        template: trimTemplateFile('./config/generators/feature/register-saga.hbs'),
        abortOnFail: false,
      },

      // tests
      {
        type: 'add',
        path: path.resolve(
          `./app/react/features/${toTitleCase(data.name)}/__tests__/${toTitleCase(
            data.name,
          )}.reducer.spec.ts`,
        ),
        templateFile: './feature/tests/reducer.spec.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve(
          `./app/react/features/${toTitleCase(data.name)}/__tests__/${toTitleCase(
            data.name,
          )}.selectors.spec.ts`,
        ),
        templateFile: './feature/tests/selectors.spec.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve(
          `./app/react/features/${toTitleCase(data.name)}/__tests__/${toTitleCase(
            data.name,
          )}.actions.spec.ts`,
        ),
        templateFile: './feature/tests/actions.spec.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve(
          `./app/react/features/${toTitleCase(data.name)}/__tests__/${toTitleCase(
            data.name,
          )}.component.spec.tsx`,
        ),
        templateFile: './feature/tests/index.component.spec.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve(
          `./app/react/features/${toTitleCase(data.name)}/__tests__/${toTitleCase(
            data.name,
          )}.saga.get.spec.ts`,
        ),
        templateFile: './feature/tests/saga.get.spec.js.hbs',
        abortOnFail: true,
      },
    ]
  },
}
