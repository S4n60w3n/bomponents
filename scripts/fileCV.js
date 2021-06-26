const fs = require('fs')

const INPUT = 'out/index.html'
const OUT = 'out/cv.html'
const URL = 'https://www.arokis.me'

fs.readFile(INPUT, 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  var result = data.replace(/\/_next/g, `${URL}/_next`)

  fs.writeFile(OUT, result, 'utf8', function (err) {
    if (err) {
      return console.log(err)
    }
  })
})
