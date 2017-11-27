const express = require("express");
const bodyParser = require("body-parser");
const user = require("./apis/user");
const books = require("./apis/books");
const db = require("./db/query");
const authentication = require('./apis/authentication');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { user: "" });
});

app.use("/api/user", user);
app.use("/api/books", books);
app.use("/api/auth", authentication);

app.get("*", (req, res) => {
  res.send("That page does not exist");
});

app.listen(8000, "localhost", () => {
  console.log("Server has started on port: 8000");
});
