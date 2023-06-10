// IMPORT DEPEDENCIES & SETUP
require("dotenv").config() // loads the variables in the .env into the process.env object
const express = require("express") // importing the express library
const morgan = require("morgan") // importing the morgan library
const fruits = require("./models/fruits") // return whatever fruits.js exports
const PORT = process.env.PORT // GETTING THE PORT FROM OUR .ENV FILE
const app = express() // express application


// MIDDLEWARE (Functions that run between the request and response)
app.use(morgan("dev")) // SETS UP OUT LOGGING MIDDLEWARE
app.use(express.static("public")) // treat the public folder as a static file server


// ROUTES

// INDEX - GET - LIST ALL FRUITS - /fruit
app.get("/fruit", (req, res) => {
  // render an ejs template with all the fruits
  res.render("index.ejs", {fruits})
})

// SHOW - GET - SHOWS ONE FRUIT - /fruit/:id
app.get("/fruit/:id", (req, res) => {
    // grab the id from the url
    const id = req.params.id
    // create a variable with the fruit specified
    const fruit = fruits[id]
    // dynamically set a class
    const readyClass = fruit.readyToEat ? "green" : "red"
    // render a template with the fruit
    res.render("show.ejs", {fruit, readyClass})
})


// LISTENER
app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
})