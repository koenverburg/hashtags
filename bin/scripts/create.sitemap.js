const fs = require('fs')
const { getPages } = require('./helpers/get.pages')
const formatDate = date => {
  const originalDate = new Date(date)
  const year = originalDate.getFullYear()

  let day = '' + originalDate.getDate()
  let month = '' + (originalDate.getMonth() + 1)

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

const getLastModified = lastModified => lastModified ? formatDate(new Date(lastModified)) : today

// SITEMAP.XML
const pathsObj = getPages();
const today = formatDate(new Date());

const urlTemplate = (page, lastmod) => {
  if (String(page).includes('index')) {
    page = '/'
  }

  return `  <url>
    <loc>https://koenverburg.dev${page}</loc>
    <lastmod>${getLastModified(lastmod)}</lastmod>
  </url>`
}

const writePages = (pages) => {
  return Object.keys(pages).map(page => {
    const pageName = page.replace('/app/', '')
    if(pageName.charAt(0) !== '_') {
      return urlTemplate(page, pages[page].lastModified)
    }
  })
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${writePages(pathsObj).join('')}
</urlset>
`;

module.exports.createSitemap = dest =>  fs.writeFileSync(`${dest}/sitemap.xml`, sitemapXml);
