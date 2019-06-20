// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
// Server
var app = express();
var PORT = process.env.PORT || 3000;
// Serve Static Pages
app.use(express.static("public"));
// Midware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// View Engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Bring in Router
var routes = require("./controllers/burgers_controller.js");
app.use(routes);
// Start that Server
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });