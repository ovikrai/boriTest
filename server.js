'use strict'

var express = require('express')
var exphbs = require('express-handlebars')
var palabras = require('./public/palabras.js')

var app = express()

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'})) // set main layout
app.set('view engine', '.hbs')

// variables in the backside
var placeText = 'Enter A text'

// to serve static files
app.use('/public', express.static('public'))

// dynamic views
app.get('/', (req, res) => {
  res.render('boritest', {
    placeHolder: placeText
  })
})

app.get('/boritest', (req, res) => {
  // input del usuario
  var inputText = req.query.userInput
  // palabras y counter declaration
  var boriWords = palabras.getWords
  var wordsCounters = []

  for (var i = 0; i < boriWords.length; i++) {
  // patron de palabras de que macheen
    if (inputText.match(boriWords[i]) === null) {
      wordsCounters[i] = 0
    } else {
      wordsCounters[i] = inputText.match(boriWords[i]).length
    }
  }

  // format file to count all words
  var boriPercent = 0
  var fileLen = 0

  var regex = /\s+/gi
  // total numer of words
  fileLen = inputText.trim().replace(regex, ' ').split(' ').length

 // Extra information for future development 
 //
 // total numer of Characters (including trails)
 // var totalChars = inputText.length
 // total numer of Characters (excluding trails)
 // var charCount = inputText.trim().length
 // total numer of Characters (excluding all spaces)
 // var charCountNoSpace = inputText.replace(regex, '').length
 // suma todos los elemtos de wordsCounters

  var totalCounters = 0
  for (var j = 0; j < wordsCounters.length; j++) {
    totalCounters += wordsCounters[j]
  }

  boriPercent = (totalCounters / fileLen) * 100

  console.log('Percent of boricua:' + boriPercent + '\n')
  console.log('Words Count:' + wordsCounters + '\n')
  console.log('Total of Counters:' + totalCounters + '\n')
  console.log('The text input:' + inputText + '\n')
  console.log('File size:' + fileLen + '\n')

  // clasificaciones de tipo de boricua
  var boriType = ''
  var boriDesc = ''
  var fotoPerc = ''
  if ((boriPercent >= 0) && (boriPercent <= 25)) {
    boriType = 'Visitante'
    boriDesc = `Si es que vives en Boriken, al parecer no sales de tu casa. Estas hecho un trili.`
    fotoPerc = 'bandera25'
  }

  if ((boriPercent >= 26) && (boriPercent <= 50)) {
    boriType = 'Residente'
    boriDesc = 'No eres un trili, pero no estas rankeao y te falta mucho por aprender.'
    fotoPerc = 'bandera50'
  }

  if ((boriPercent >= 51) && (boriPercent <= 75)) {
    boriType = 'Jibaro Soy'
    boriDesc = 'Estas afuego. Se nota que sales a chinchorear todos los fines de semana. Pero todavia te falta mas calle.'
    fotoPerc = 'bandera75'
  }

  if ((boriPercent >= 76) && (boriPercent <= 100)) {
    boriType = 'Boricua Bestial'
    boriDesc = 'Te sabes todos los chinchorros y todas las lechoneras de Guavate. Eres una enciclopedia del turismo interno.'
    fotoPerc = 'bandera100'
  }

  // presentation of the data
  res.render('presentation', {
    resultado1: Math.floor(boriPercent),
    resultado2: boriType,
    resultado3: boriDesc,
    bandera: fotoPerc
  })
})

// errors
app.use((req, res) => {
  res.type('text/html')
  res.status(404)
  res.render('error')
})

// the port that is served
app.listen(3000, () => {
  console.log('Server listening on: http://127.0.0.1:3000')
})
