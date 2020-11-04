const https = require('https')
const cheerio = require('cheerio')
const fetch = require('isomorphic-fetch')
const { join } = require('path')

const fetchData = async (tag) => {
  return await fetch(`https://www.instagram.com/explore/tags/${tag}`)
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.text()
    })
}

const fetchTagCount = async (tag) => {
  const html = await fetchData(tag)
  const regex = /window\._sharedData\s*=\s*{.+}/

  const re = new RegExp(regex, 'gm')
  const match = re.exec(html)

  const data = JSON.parse(match[0].replace(/^window\._sharedData\s*=\s*/, ''))

  const graphqlRef = Object.keys(data.entry_data.TagPage)[0]
  graphqlData = data.entry_data.TagPage[graphqlRef].graphql

  const name = graphqlData.hashtag.name
  const allowFollowing = graphqlData.hashtag.allow_following
  const postCount = graphqlData.hashtag.edge_hashtag_to_media.count
  return `hashtag: ${name}, post count: ${postCount}, canBeFollowed: ${allowFollowing}`;
}

(async () => {
  const hashtags = [
    'photography',
    'photographer',
    'fotografie',
    'rotterdam',
    'dutch',
    'europe',
    'nikon',
    'nikkor',
    'kameraexpress',
    'memories',
    'sigma',
    'contrast',
    'sky',
    'sunset',
    'goldenhour',
    'goldenhourphotography',
    'walks',
    'friends'
  ]

  for (const tag of hashtags) {
    const result = await fetchTagCount(tag)
    console.log(result);
  }
  console.log(`tag count: ${hashtags.length}`)
})()
