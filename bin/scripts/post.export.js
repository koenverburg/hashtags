const path = require('path')
const { createSitemap } = require('./create.sitemap')
const { copyStaticFiles } = require('./copy.static.files')

const dest = path.join('dist')
const root = path.resolve(__dirname, '..', '..')

module.exports.PostExport = function() {
  createSitemap(dest)
  copyStaticFiles(root, dest)
}
