const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/tacos', (req, res) => {
    res.send('tacos here')
})
app.post('/tacos', (req, res) => {
    const {meat, qty} = req.body
    res.send(`OK ${qty} of ${meat}`)
})

app.listen(3000, () => {
    console.log('Serveri hyrrää')
})