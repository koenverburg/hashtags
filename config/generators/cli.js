const hocGenerator = require('./hoc/index')
const featureGenerator = require('./feature/index')
const componentGenerator = require('./component/index')
const containerGenerator = require('./container/index')
const componentWithDataGenerator = require('./componentsWithData/index')

module.exports = (plop) => {
  plop.setGenerator('hoc', hocGenerator)
  plop.setGenerator('feature', featureGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('container', containerGenerator)
  plop.setGenerator('graphcomponent', componentWithDataGenerator)

  plop.addHelper('uppercase', (text) => text.toUpperCase())

  plop.addHelper('getPath', (p, itemName) => {
    const pathParts = p.split('/')
    const index = pathParts.indexOf(itemName)
    const newPath = pathParts.slice(index + 1, pathParts.length)
    return newPath.length < 1 ? `./${newPath}` : `./${newPath.join('/')}/`
  })

  plop.addHelper('curly', (object, open) => (open ? '{' : '}'))
}
