// Imports node modules
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const Recipes = require("./backend/models/recipesModel");
const Superfoods = require("./backend/models/superfoodsModel");
const Characters = require("./backend/models/charactersModel");

// Create database connection
const connectDB = require("./backend/db/dbConnect");
connectDB();

// Create variaple and store port
const port = process.env.PORT || 3000;

// Create instance of express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files used for CSS, JS and images
app.use(express.static("frontend"));
app.use("/css", express.static(__dirname + "/frontend/public/css"));
app.use("/js", express.static(__dirname + "/frontend/public/js"));
app.use("/img", express.static(__dirname + "/frontend/public/img"));

// API Routing pages for all database collections
app.use("/api/questions", require("./backend/routes/questionRoutes"));
app.use("/api/characters", require("./backend/routes/characterRoutes"));
app.use("/api/recipes", require("./backend/routes/recipeRoutes"));
app.use("/api/superfoods", require("./backend/routes/superfoodRoutes"));

// set views
app.set("views", "frontend/views");
app.set("view engine", "ejs");

// Get index and render the response.
app.get("", (req, res) => {
  res.render("index", { text: " - home" });
});

// Get about url and render the response.
app.get("/about", (req, res) => {
  res.render("about", { text: " - about" });
});

// Get quiz url and render the response.
app.get("/quiz", (req, res) => {
  res.render("quiz");
});

// Get superfoodcircus url and render the response.
app.get("/superfoodcircus", (req, res) => {
  // Get superfood data and pass it to the superfoodcircus view.
  Superfoods.find()
    .then((result) => {
      res.render("superfoodcircus", { superfoods: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get characters url and render the response.
app.get("/character", (req, res) => {
  // Get characters data and pass it to the characters view.
  Characters.find()
    .then((result) => {
      res.render("character", { character: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get recipes url and render the response.
app.get("/recipes", (req, res) => {
  // Get recipe data and pass it to the recipe view.
  Recipes.find()
    .then((result) => {
      res.render("recipes", { recipes: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get single recipe url and render the response.
app.get("/recipe/:id", (req, res) => {
  // Get Id parameter and store in variable
  const recipeId = req.params.id;

  // Get recipe data and pass it to the recipe view with id.
  Recipes.find()
    .then((result) => {
      res.render("recipe", { recipes: result, id: recipeId });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get references url and render the response.
app.get("/references", (req, res) => {
  res.render("references", { text: " - references" });
});

// Render the 404 page when a 404 status is received
app.use(function (req, res, next) {
  res.status(404).render("fourOfour");
});

// Listen for port 5000
app.listen(port, () => console.info(`Started on port ${port}`));
