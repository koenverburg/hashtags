const fs = require('fs')
const args = require('args')
const path = require('path')
const { URL } = require('url')
const puppeteer = require('puppeteer')
const lighthouse = require('lighthouse')
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator')
const { write } = require('lighthouse/lighthouse-cli/printer')
const { mobileConfig } = require('./mobile.config')
const { desktopConfig } = require('./desktop.config')

args.option('url', 'The url for lighthouse to do the audit on')
args.option('platform', 'The url for lighthouse to do the audit on')

const flags = args.parse(process.argv)

if (!flags.url) return
if (!flags.platform) return

(async () => {
  if (!fs.existsSync(path.resolve(__dirname, '..', '..', `.reports/lighthouse/mobile`)))
    fs.mkdirSync(path.resolve(__dirname, '..', '..', `.reports/lighthouse/mobile`), { recursive: true })

  if (!fs.existsSync(path.resolve(__dirname, '..', '..', `.reports/lighthouse/desktop`)))
    fs.mkdirSync(path.resolve(__dirname, '..', '..', `.reports/lighthouse/desktop`), { recursive: true })

  // Use Puppeteer to launch headful Chrome and don't use its default 800x600 viewport.
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  })

  let platformConfig = undefined
  if (flags.platform === 'mobile') {
    platformConfig = mobileConfig
  } else {
    platformConfig = desktopConfig
  }

  // Lighthouse will open URL. Puppeteer observes `targetchanged` and sets up network conditions.
  // Possible race condition.
  const { lhr: results } = await lighthouse(flags.url, {
    port: new URL(browser.wsEndpoint()).port,
    output: 'json',
    outputPath: '.reports/lighthouse/audit.json',
    preset: 'full',
    logLevel: 'verbose',
    'save-assets': true,
  }, platformConfig)

  await write(
    reportGenerator.generateReportHtml(results),
    'html',
    path.join(__dirname, '..', '..', `.reports/lighthouse/${flags.platform.toLowerCase()}/report.html`)
  )

  process.stdout.write(
    `Lighthouse scores: ${Object.values(results.categories)
      .map(c => c.score)
      .join(', ')}\n`
  )

  await browser.close()
})()
