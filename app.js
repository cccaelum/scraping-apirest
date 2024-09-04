const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()

// Middleware para manejar datos JSON
app.use(express.json());
// Middleware para manejar datos de formularios URL-encoded
app.use(express.urlencoded({ extended: true }));

const url = 'https://elpais.com/ultimas-noticias/'

app.get('/', (req,res)=>{
    res.send('funciona')
})

app.listen(3000, () => {
    console.log('express esta escuchando en el puerto http://localhost:3000')
})