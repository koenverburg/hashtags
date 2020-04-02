const path = require('path')
const { trimTemplateFile, toTitleCase } = require('../utils/')

module.exports = {
  description: 'Generate a Container (page) Component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the container?',
      default: 'about',
      validate: (value) => {
        if ((/.+/).test(value)) { return true }
        return 'The name is required.'
      }
    }],
  actions: (data) => {
    return [
      {
        type: 'add',
        path: path.resolve(`./app/react/containers/${toTitleCase(data.name)}/index.tsx`),
        templateFile: './container/container.js.hbs',
        abortOnFail: true
      },

      {
        type: 'add',
        path: path.resolve(`./app/react/containers/${toTitleCase(data.name)}/__tests__/component.${toTitleCase(data.name)}.spec.tsx`),
        templateFile: './container/container.spec.hbs',
        abortOnFail: true
      },

      // update routes file
      {
        type: 'modify',
        path: path.resolve(`./app/react/Router.tsx`),
        pattern: /(\/\* GENERATOR-ROUTE-IMPORT \*\/)/g,
        template: trimTemplateFile('./config/generators/container/route.import.js.hbs'),
        abortOnFail: false
      }, {
        type: 'modify',
        path: path.resolve(`./app/react/Router.tsx`),
        pattern: /(\{\/\* GENERATOR-ROUTE \*\}\/)/g,
        template: trimTemplateFile('./config/generators/container/route.js.hbs'),
        abortOnFail: false
      },

      // update index files
      {
        type: 'modify',
        path: path.resolve(`./app/react/containers/index.ts`),
        pattern: /(\/\* GENERATOR-IMPORT \*\/)/g,
        template: trimTemplateFile('./config/generators/component/import.js.hbs'),
        abortOnFail: false
      }]
  }
}
