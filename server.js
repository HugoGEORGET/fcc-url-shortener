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

const urlPattern = /https?:\/\/www.[a-zA-Z0-9@:%._+-~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
const urlRegex = new RegExp(urlPattern);

app.post("/api/shorturl/new", (req, res) => {
  console.log("URL to be shortened : " + req.body.url);
  if (urlRegex.test(req.body.url)) {
    let splitUrl = req.body.url.split("/");
    console.log("splitUrl : " + splitUrl);
    let shortenedUrl = splitUrl.slice(0, 3).toString();

    console.log("shortened URl = " + shortenedUrl);

    dns.lookup(shortenedUrl,()=> {
      
    });
  } else {
    res.json({ error: "invalid URL" });
  }
});

app.listen(port, function() {
  console.log("Node.js listening ...");
});
