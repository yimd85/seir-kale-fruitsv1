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
app.use(express.urlencoded({extended: false})) // middleware for parsing urlencoded


// ROUTES

// INDEX - GET - LIST ALL FRUITS - /fruit
app.get("/fruit", (req, res) => {
  // render an ejs template with all the fruits
  res.render("index.ejs", {fruits})
})

// NEW - GET - SHOW A FORM TO CREATE A FRUIT
app.get("/fruit/new", (req, res) => {
  // render the new template
  res.render("new.ejs")
})

// DESTROY - DELETE - DELETE A FRUIT

// UPDATE - PUT - UPDATE A FRUIT

// CREATE - POST - CREATE A FRUIT
app.post("/fruit", (req, res) => {
  //  turn the ready to eat property into a BOOLEAN
  // EXPRESSION ? TRUE : FALSE
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false
  // PUSH THE NEW FRUIT INTO THE ARRAY
  fruits.push(req.body)
  // SEND USER BACK TO THE INDEX PAGE
  res.redirect("/fruit") // get => /fruit
})


// EDIT - GET - RENDER FORM TO UPDATE A FRUIT


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