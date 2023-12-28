// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();
const cors = require("cors"); // Import the cors middleware

app.use(cors());

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes= require("./routes/auth.routes");
app.use("/auth", authRoutes)

const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

const postRoutes = require("./routes/posts.routes");
app.use("/posts", postRoutes);

const formRoutes = require("./routes/form.routes");
app.use("/forms", formRoutes);

const favoritesRoutes = require("./routes/favorites.routes");
app.use("/favorites", favoritesRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
