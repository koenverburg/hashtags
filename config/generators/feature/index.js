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
        path: path.resolve(
          `./app/features/${toTitleCase(data.name)}/${toTitleCase(
            data.name
          )}.store.ts`
        ),
        templateFile: './feature/feature.store.ts.hbs',
        abortOnFail: true,
      },

      {
        type: 'add',
        path: path.resolve(
          `./app/features/${toTitleCase(data.name)}/${toTitleCase(
            data.name
          )}.repository.ts`
        ),
        templateFile: './feature/feature.repository.ts.hbs',
        abortOnFail: true,
      },

      {
        type: 'add',
        path: path.resolve(
          `./app/features/${toTitleCase(data.name)}/index.tsx`
        ),
        templateFile: './feature/feature.index.tsx.hbs',
        abortOnFail: true,
      },

      {
        type: 'add',
        path: path.resolve(
          `./app/features/${toTitleCase(data.name)}/models/${toTitleCase(
            data.name
          )}.model.ts`
        ),
        templateFile: './feature/feature.model.ts.hbs',
        abortOnFail: true,
      },

      {
        type: 'add',
        path: path.resolve(
          `./app/features/${toTitleCase(data.name)}/__tests__/${toTitleCase(
            data.name
          )}.component.spec.tsx`
        ),
        templateFile: './feature/feature.component.spec.tsx.hbs',
        abortOnFail: true,
      },

      {
        type: 'add',
        path: path.resolve(
          `./app/features/${toTitleCase(data.name)}/__tests__/${toTitleCase(
            data.name
          )}.store.spec.ts`
        ),
        templateFile: './feature/feature.store.spec.ts.hbs',
        abortOnFail: true,
      },

      {
        type: 'add',
        path: path.resolve(
          `./app/features/${toTitleCase(data.name)}/__tests__/${toTitleCase(
            data.name
          )}.repository.spec.ts`
        ),
        templateFile: './feature/feature.repository.spec.ts.hbs',
        abortOnFail: true,
      },

      // index files
      {
        type: 'modify',
        path: path.resolve(`./app/features/index.ts`),
        pattern: /(\/\* GENERATOR-IMPORT \*\/)/g,
        template: trimTemplateFile(
          './config/generators/component/import.js.hbs'
        ),
        abortOnFail: false,
      },
    ]
  },
}
