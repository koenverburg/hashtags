const path = require('path')
const { trimTemplateFile, toTitleCase } = require('../utils/')

module.exports = {
  description: 'Generate a High Order Component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the HOC?',
      default: 'PageTitle',
      validate: (value) => {
        if ((/.+/).test(value)) { return true }
        return 'The name is required.'
      }
    }],
  actions: (data) => {
    return [
      {
        type: 'add',
        path: path.resolve(`./app/react/hoc/${toTitleCase(data.name)}/index.tsx`),
        templateFile: './hoc/hoc.js.hbs',
        abortOnFail: true
      },
      {
        type: 'add',
        path: path.resolve(`./app/react/hoc/${toTitleCase(data.name)}/__tests__/${toTitleCase(data.name)}.spec.tsx`),
        templateFile: './hoc/hoc.spec.js.hbs',
        abortOnFail: true
      },

      // index files
      {
        type: 'modify',
        path: path.resolve(`./app/react/hoc/index.ts`),
        pattern: /(\/\* GENERATOR-IMPORT \*\/)/g,
        template: trimTemplateFile('./config/generators/component/import.js.hbs'),
        abortOnFail: false
      }]
  }
}
