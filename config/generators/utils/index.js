const fs = require('fs')

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
}

const trimTemplateFile = (template) => {
  // Loads the template file and trims the whitespace and then returns the content as a string.
  return fs.readFileSync(template, 'utf8').replace(/\s*$/, '')
};

module.exports = {
  trimTemplateFile,
  toTitleCase
}
