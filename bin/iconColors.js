const https = require('https')
const fs = require('fs')

const url = 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json'
const iconFolder = './static/icons/simple/'

const slugify = (string) => string.replace('’', '').replace(/[^A-Za-z0-9]/, '-').toLowerCase()

const slugMap = {
  'let-s-encrypt': 'lets-encrypt',
  'gog-dot-com': 'gog-com',
}

https.get(url,(res) => {
  let body = ''

  res.on('data', (chunk) => {
    body += chunk
  })

  res.on('end', () => {
    const icons = []
    try {
      const iconData = JSON.parse(body)
      fs.readdirSync(iconFolder).forEach(icon => {
        const localIcon = icon.replace('.svg', '')
        const iconObject = iconData.icons.find((iconObject) => {
          const iconSlug = slugify(iconObject.title)
          return localIcon === iconSlug || slugMap[localIcon] === iconSlug
        })
        if (iconObject) {
          icons.push({
            ...iconObject,
            slug: localIcon,
          })
        } else {
          console.error(`Couldn’t find icon for ${localIcon}`)
        }
      })
      const iconsScss = icons.map((iconObject) => {
        return `span.icon.colored.${iconObject.slug} svg { fill: #${iconObject.hex} }`
      }).join('\n')
      fs.writeFileSync('./sass/_icons.scss', iconsScss)
    } catch (error) {
      console.error(error.message)
    }
  })

}).on('error', (error) => {
  console.error(error.message)
})
