var express = require("express");
var app = express();

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

// app.use(express.static("node_modules/dom-to-image/dist"));
app.use(express.static("public"));

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
