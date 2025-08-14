const express = require('express')
const exphbs = require('express-handlebars')
const palabras = require('./public/palabras.js')

const app = express()
const port = process.env.PORT || 5001
const config = { defaultLayout: 'main', extname: '.hbs' }

app.engine('.hbs', exphbs(config)) // set main layout
app.set('view engine', '.hbs')

// variables in the backside
const placeText = 'Enter A text'

// to serve static files
app.use('/public', express.static('public'))

// dynamic views
app.get('/', (req, res) => {
  res.render('boritest', {
    placeHolder: placeText
  })
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/boritest', (req, res) => {
  // input del usuario
  let inputText = req.query.userInput.toLowerCase()

  console.log('Input Text:' + inputText + '\n')

  // palabras y counter declaration
  const boriWords = palabras.getWords
  let wordsCounters = []

  for (let i = 0; i < boriWords.length; i++) {
    wordsCounters[i] = 0
  }

  let words = inputText.split(/\W+/).filter(function (token) {
    // token = token.toLowerCase()
    return token.length >= 2
  })

  console.log('Tokenized Words: ' + words + '\n')

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < boriWords.length; j++) {
      // Check if words match
      if (words[i] === boriWords[j]) {
        wordsCounters[j] = wordsCounters[j] + 1
      }
    }
  }

  // format file to count all words
  let boriPercent = 0
  let fileLen = words.length

  // suma todos los elementos de wordsCounters
  let totalCounters = 0
  for (let j = 0; j < wordsCounters.length; j++) {
    totalCounters += wordsCounters[j]
  }

  boriPercent = (totalCounters / fileLen) * 100

  console.log('Percent of boricua:' + boriPercent + '\n')
  console.log('Words Count:' + wordsCounters + '\n')
  console.log('Total of Counters:' + totalCounters + '\n')
  console.log('The text input:' + inputText + '\n')
  console.log('File size:' + fileLen + '\n')

  // clasificaciones de tipo de boricua
  let response
  if ((boriPercent >= 0) && (boriPercent <= 25)) {
    response = {
      resultado1: Math.floor(boriPercent),
      resultado2: 'Visitante',
      resultado3: `Si es que vives en Boriken, al parecer no sales de tu casa. Estas hecho un trili.`,
      bandera: 'bandera25'
    }
  }

  if ((boriPercent >= 26) && (boriPercent <= 50)) {
    response = {
      resultado1: Math.floor(boriPercent),
      resultado2: 'Residente',
      resultado3: 'No eres un trili, pero no estas rankeao y te falta mucho por aprender.',
      bandera: 'bandera50'
    }
  }

  if ((boriPercent >= 51) && (boriPercent <= 75)) {
    response = {
      resultado1: Math.floor(boriPercent),
      resultado2: 'Jibaro Soy',
      resultado3: 'Estas afuego. Se nota que sales a chinchorear todos los fines de semana. Pero todavia te falta mas calle.',
      bandera: 'bandera75'
    }
  }

  if ((boriPercent >= 76) && (boriPercent <= 100)) {
    response = {
      resultado1: Math.floor(boriPercent),
      resultado2: 'Boricua Bestial',
      resultado3: 'Te sabes todos los chinchorros y todas las lechoneras de Guavate. Eres una enciclopedia del turismo interno.',
      bandera: 'bandera100'
    }
  }

  // presentation
  res.render('presentation', response)
})

// errors
app.use((req, res) => {
  res.type('text/html')
  res.status(404)
  res.render('error')
})

// the port that is served
app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
