// import dependencies
const express = require("express") // express library
// const fruits = require("../models/fruits") // import fruits data
// becaues the models/fruits is uppercase the variable should be uppercase
const Fruits = require('../models/fruits');

// create a router
const router = express.Router()


// ROUTES

// INDEX - GET - LIST ALL FRUITS - /fruit
router.get("/", async (req, res) => {
  //we need the async keyword 'promisify' this call back function


  //get the documents from the fruits collection
  //and then pass that into our render
  //this line calls the DB looks for the Fruits model defined on model/fruits and the 
  // '.find' method w empty brackets gets everything on from the fruits collection
  const fruits = await Fruits.find({});
  //this line below will find all documents with a name that matches "Banana"
  // const fruits = await Fruits.find({ name: 'Banana'});

  //the dot then version. be sure to remove the async keyword 
  // Fruits.find({}).then(fruits => {
  //   res.render("fruits/index.ejs", { fruits })
  // })


  // console.log(fruits)
  // render an ejs template with all the fruits
  res.render("fruits/index.ejs", { fruits })
})

// NEW - GET - SHOW A FORM TO CREATE A FRUIT
router.get("/new", (req, res) => {
  // render the new template
  res.render("fruits/new.ejs")
})

// DESTROY - DELETE - DELETE A FRUIT
router.delete("/:id", async (req, res) => {
  // grab the id from the url
  const id = req.params.id
  // splice the object out of the array
  // fruits.splice(id, 1)
  await Fruits.findByIdAndDelete(id)

  // redirect user back to index
  res.redirect("/fruit")
})

// UPDATE - PUT - UPDATE A FRUIT
router.put("/:id", async (req, res) => {
  // get the id from the url
  const id = req.params.id
  // make sure readyToEat is a boolean
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false
  // swap the current version with the new version in the array
  // fruits[id] = req.body

  await Fruits.findByIdAndUpdate(id, req.body)


  // redirect the user back to the index page
  res.redirect("/fruit")
})

// CREATE - POST - CREATE A FRUIT
router.post("/", (req, res) => {
  //  turn the ready to eat property into a BOOLEAN
  // EXPRESSION ? TRUE : FALSE
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false
  // PUSH THE NEW FRUIT INTO THE ARRAY
  
  // SEND USER BACK TO THE INDEX PAGE

  // fruits.push(req.body)
  // await Fruits.create(req.body)

  // res.redirect("/fruit") // get => /fruit

  Fruits.create(req.body).then(()=>{
    res.redirect("/fruit")
  })

})


// EDIT - GET - RENDER FORM TO UPDATE A FRUIT
router.get("/:id/edit", async (req, res) => {
  // get the index of the specified fruit
  const id = req.params.id
  // get the fruit using the index
  // const fruit = fruits[id]

  const fruit = await Fruits.findById(id)
  // render the template, pass the fruit and index
  res.render("fruits/edit.ejs", { fruit, id })
})


// SHOW - GET - SHOWS ONE FRUIT - /fruit/:id
router.get("/:id", async (req, res) => {
  // grab the id from the url
  const id = req.params.id
  // create a variable with the fruit specified
  // const fruit = fruits[id]

  const fruit = await Fruits.findById(id)

  // dynamically set a class
  const readyClass = fruit.readyToEat ? "green" : "red"
  // render a template with the fruit
  res.render("fruits/show.ejs", { fruit, readyClass, id })
})



// EXPORT OUR ROUTER
module.exports = router
