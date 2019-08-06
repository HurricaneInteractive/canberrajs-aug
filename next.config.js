const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')

// module.exports = withTypescript(withCSS({}))

module.exports = withPlugins([
  [withTypescript],
  [withCSS]
], {
  // target: "serverless",
  exportPathMap: async function(defaultPathMap) {
    return {
      "/": { page: "/" },
      "/resauce?id=2": { page: "/resauce", query: { id: 2 } },
      "/resauce?id=3": { page: "/resauce", query: { id: 3 } },
      "/resauce?id=5": { page: "/resauce", query: { id: 5 } },
      "/resauce?id=6": { page: "/resauce", query: { id: 6 } },
      "/resauce?id=7": { page: "/resauce", query: { id: 7 } }
    }
  }
})
