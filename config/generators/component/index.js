const path = require('path')
const { trimTemplateFile, toTitleCase } = require('../utils/')

module.exports = {
  description: 'Generate a stateless functional component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What is the name of the component?',
    default: 'badge',
    validate: value => {
      if ((/.+/).test(value)) { return true }
      return 'The name is required.'
    }
  }],
  actions: data => {
    return [
      {
        type: 'add',
        path: path.resolve(`./app/components/${toTitleCase(data.name)}/index.tsx`),
        templateFile: './component/stateless.hbs',
        abortOnFail: true
      },

      {
        type: 'add',
        path: path.resolve(`./app/components/${toTitleCase(data.name)}/__tests__/component.${toTitleCase(data.name)}.spec.tsx`),
        templateFile: './component/stateless.spec.hbs',
        abortOnFail: true
      },

      // index files
      {
        type: 'modify',
        path: path.resolve(`./app/components/index.ts`),
        pattern: /(\/\* GENERATOR-IMPORT \*\/)/g,
        template: trimTemplateFile('./config/generators/component/import.js.hbs'),
        abortOnFail: false
      }]
  }
}
