// npm init -y
// $ npm i express body-parser
// $ nodemon app.js
// $ npm install ejs
// touch index.ejs

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy food", "Cook food", "Eat food"]; // do this cuz of scope

const workItems = [];

const funItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
// or write this instead?
// app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  const day = date.getDate();

  res.render("list", { listTitle: day, newListItems: items });
  // make sure the above key inside the js object must match the one in the ejs file. here ex. kindOfDay
  // Express will look for a folder called views, and look inside for a file called list.ejs, so make sure the folder and the file name exists!
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else if (req.body.list === "Fun") {
    funItems.push(item);
    res.redirect("/fun");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/fun", function (req, res) {
  res.render("list", { listTitle: "Fun List", newListItems: funItems });
});

app.post("/fun", function (req, res) {
  const item= req.body.newItem;
  funItems.push(item);
  res.redirect("/fun");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(5000, function () {
  console.log("Server started on port 5000");
});
