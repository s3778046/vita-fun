// Imports node modules
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const Recipes = require("./backend/models/recipesModel");

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

// Get about uri and render the response.
app.get("/about", (req, res) => {
  res.render("about", { text: " - about" });
});

// Get quiz uri and render the response.
app.get("/quiz", (req, res) => {
  res.render("quiz");
});

// Get superfoodcircus uri and render the response.
app.get("/superfoodcircus", (req, res) => {
  res.render("superfoodcircus");
});

// Get recipes uri and render the response.
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

// Get references uri and render the response.
app.get("/references", (req, res) => {
  res.render("references", { text: " - references" });
});

// Listen for port 5000
app.listen(port, () => console.info(`Started on port ${port}`));
