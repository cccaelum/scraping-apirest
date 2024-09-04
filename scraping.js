const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const fs = require('fs')

const url = 'https://elpais.com/ultimas-noticias/'

app.get("/", async (req, res) => {
    try {
      const response = await axios.get(url)
      const html = response.data
      const $ = cheerio.load(html)

      //const h2 = $("header.c_h h2").text()
     // const p = $("p.c_d").text()
     // console.log(p)
      

      

      const links = []
      const titulos = []
      $("article.c c-d c--m ").each((i,elemento) => {
        const link = $(elemento).find('a').attr("href")
        const titulo = $(elemento).find('h2.c_t').text()
        links.push(link)
        titulos.push(titulo)
        console.log(titulos)
      })    

    let noticias = []
      const noticia = {
        titulo: titulos,
        imagen: "",
        descripcion: "",
        enlace: links,
      };
      noticias.push(noticia)

fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2))


    } catch (error) {
        console.error(`el error es el ${error}`)
        res.status(500).send(`Error interno ${error}`)
      }
     })
     

app.listen(3001, () => {

    console.log('express esta escuchando en el puerto http://localhost:3001')

})
/*
async function scrapingLinks(link) {
    try {
      const response = await axios.get(`https://es.wikipedia.org${link}`)
      const html = response.data
      const $ = cheerio.load(html)
   
   
      const h2 = $("h2").text()
      const images = []
      $("img").each((i, elemento) => {
        const src = $(elemento).attr("src")
        images.push(src)
      })
      const texts = []
      $("p").each((i, elemento) => {
        const text = $(elemento).text()
        texts.push(text)
      })
     
      return {h2, images, texts}
   
   
    } catch (error) {
      console.error(`el error es el ${error}`)
      res.status(500).send(`Error interno ${error}`)
    }
}
*/


/*
function leerDatos() {
    try {
      const data = fs.readFileSync('noticias.json', 'utf-8');
      noticias = JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo noticias.json:', error.message);
    }
  }
  
  
  function guardarDatos() {
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
  }*/