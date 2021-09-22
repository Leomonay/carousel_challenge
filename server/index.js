require('dotenv').config()
const express = require('express')
const app = express()
const host = process.env.HOST
const port = process.env.PORT

app.get('/carouselSource', (req, res) => {
    const imageCollection = [{
        title: 'Sing me a song',
        image: 'https://www.petguide.com/wp-content/uploads/2018/07/funniest-dog-breeds-pug.jpg'
    },
    {
        title: 'Are you talking to me?',
        image: 'https://www.meme-arsenal.com/memes/111b02ccccbb85c71174382acced3294.jpg'
    },
    {
        title: "Surprise!",
        image: 'https://danielfotheringham.com/wp-content/uploads/2016/10/happy-dog.jpg'
    },
    {
        title:'Developing',
        image:'https://thumbs.dreamstime.com/b/funny-dog-glasses-tie-working-computer-laptop-desk-isolated-wearing-78395569.jpg'
    },
    {
        title:'Driving',
        image:'https://thumbs.dreamstime.com/b/portrait-funny-dog-behind-wheel-car-jack-russell-terrier-sunglasses-151057370.jpg'
    },
    {
        title:"Let's do some Science",
        image:'https://thumbs.dreamstime.com/b/clever-funny-dog-wearing-eyeglasses-math-equations-blackboard-background-113067181.jpg'
    },
    {
        title:"I'm a Rock Star",
        image:'https://thumbs.dreamstime.com/b/funny-punk-rock-dog-guitar-wearing-mullet-hairstyle-wig-spiked-collar-funny-punk-rock-star-dog-114250605.jpg'
    },
    {
        title:'Trust me',
        image:'https://thumbs.dreamstime.com/b/winking-dog-funny-ears-as-listening-web-banner-jack-russell-143717061.jpg'
    },
    {
        title:"Let's go vacations",
        image:'https://i2-prod.mirror.co.uk/incoming/article16521636.ece/ALTERNATES/s615/0_Tourist-dog.jpg'
    }
]  
    res.status(200).send(imageCollection)
})

app.listen(port, () => {
  console.log(`Carousel Image Source server listening at ${host}:${port}`)
})