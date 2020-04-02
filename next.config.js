const DotEnv = require('dotenv-webpack')
const withCSS = require('@zeit/next-css')
const withSize = require('next-size')
const withImages = require('next-images')
const withOffline = require('next-offline')
const withStylus = require('@zeit/next-stylus')
const withPlugins = require('next-compose-plugins')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
// stylus
const nib = require('nib')
const rupture = require('rupture')
const poststylus = require('poststylus')
const autoprefixer = require('autoprefixer')
// utils
const { PostExport } = require('./bin/scripts/post.export')

const stylusConfig = {
  stylusLoaderOptions: {
    use: [
      nib(),
      rupture(),
      poststylus([
        autoprefixer({ flexbox: 'no-2009' }),
        require('postcss-css-variables'),
      ]),
    ]
  }
}

const nextConfig = {
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }){
    if (dev) return defaultPathMap

    PostExport()

    return {
      '/': { page: '/' }
    };
  },
  distDir: '../.next',
  webpack: (config, { dev, isServer }) => {
    config.resolve.extensions.push('.ts', '.tsx')
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@utils': path.resolve('./app/utils'),
      '@hoc': path.resolve('./app/hoc'),
      '@generic': path.resolve('./app/generic'),
      '@features': path.resolve('./app/features'),
      '@components': path.resolve('./app/components'),
      '@containers': path.resolve('./app/containers'),
      '@interfaces': path.resolve('./app/base/interfaces'),
      '@constants': path.resolve('./app/base/constants'),
      '@enums': path.resolve('./app/base/enums'),
      '@helpers': path.resolve('./app/base/helpers'),
      '@constants': path.resolve('./app/base/constants'),
    }

    if (process.env.NODE_ENV === 'development') {
      config.plugins.push(new DotEnv())
    }

    if (!dev && !isServer) {
      config.optimization.minimizer = [
        new TerserJSPlugin({ parallel: true, sourceMap: false }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }

    return config
  }
}

const offlineConfig = {
  generateInDevMode: false
}

module.exports = withPlugins([
  [withOffline, offlineConfig],
  [withStylus, stylusConfig],
  [withSize],
  [withImages],
  [withCSS]
], nextConfig)
