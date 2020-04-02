const path = require('path')
const { trimTemplateFile, toTitleCase } = require('../utils/')

module.exports = {
  description: 'Generate a stateless component with graphql data',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What is the name of the component?',
    default: 'badge',
    validate: (value) => {
      if ((/.+/).test(value)) { return true }
      return 'The name is required.'
    }
  }],
  actions: (data) => {
    return [
      {
        type: 'add',
        path: path.resolve(`./app/react/componentsWithData/${toTitleCase(data.name)}/index.js`),
        templateFile: './componentsWithData/stateless.js.hbs',
        abortOnFail: true
      },

      // index files
      {
        type: 'modify',
        path: path.resolve(`./app/react/componentsWithData/index.js`),
        pattern: /(\/\* GENERATOR-IMPORT \*\/)/g,
        template: trimTemplateFile('./config/generators/component/import.js.hbs'),
        abortOnFail: false
      }]
  }
}
