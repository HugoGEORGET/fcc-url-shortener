"use strict";

var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");

var cors = require("cors");

// DNS core module
var dns = require("dns");

var app = express();
var bodyParser = require("body-parser");

// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/

// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

// body-parser setup
app.use(bodyParser.urlencoded({ extended: false }));

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

const urlRegex = new RegExp(
  "/((([A-Za-z]{3,9}:(?://)?)(?:[-;:&=+$,w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,w]+@)[A-Za-z0-9.-]+)((?:/[+~%/.w-_]*)???(?:[-+=&;%@.w_]*)#?(?:[.!/\\w]*))?)/"
);

app.post("/api/shorturl/new", (req, res) => {
  console.log(req.body);
  if (urlRegex.match(req.body.url)) {
    let splitUrl = req.body.url.split("/");
    let shortenedUrl = splitUrl.slice(0, 2);

    dns.lookup(splitUrl, res => {
      res.json({ test: "test..." });
    });
  }
  res.json({ error: "invalid URL" });
});

app.listen(port, function() {
  console.log("Node.js listening ...");
});
