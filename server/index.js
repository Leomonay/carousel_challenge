require('dotenv').config()
const express = require('express')
const app = express()
const host = process.env.HOST
const port = process.env.PORT

app.get('/carouselSource', (req, res) => {
    const imageCollection = [{
        title: "First Block",
        image: process.env.IMAGE1
    },
    {
        title: "Second Block",
        image: process.env.IMAGE2
    },
    {
        title: "Third Block",
        image: process.env.IMAGE3
    }]  
    res.status(200).send(imageCollection)
})

app.listen(port, () => {
  console.log(`Carousel Image Source server listening at ${host}:${port}`)
})