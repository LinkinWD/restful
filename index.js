const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { v4: uuid } = require('uuid')
const methodOverride = require('method-override')


app.use(express.json())
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {   id: uuid(),
        username: 'Todd',
        comment: 'That was so funny'
    },
    {   id: uuid(),
        username: 'Jarmo',
        comment: 'Eikä ollut'
    },
    {   id: uuid(),
        username: 'pekka',
        comment: 'Faack uuu Jarmo'
    },
    {   id: uuid(),
        username: 'Todd',
        comment: 'Woof woof ääliöt'
    }

]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    const työnnä = comments.push({ username, comment, id: uuid() })
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const etsi = comments.find(c => c.id === id);
    res.render('comments/show', { etsi })
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const etsi = comments.find(c => c.id === id);
    res.render('comments/edit', { etsi})
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    console.log(req.body.comment)
    const uusiTeksti = req.body.comment
    const etsiKommentti = comments.find(c => c.id === id);
    etsiKommentti.comment = uusiTeksti
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})



app.listen(3000, () => {
    console.log('Serveri hyrrää')
})