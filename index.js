const express  = require('express')
const http = require("http");
const app = express();

const host = "localhost";
const port = 1900;

app.use(express.static("public"));
app.set("view engine", "ejs");

// hello world test
app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  // routing
app.get("/liked", (req, res) => {
    res.render("liked.ejs", { data: port });
  });

//css
// app.get('*.css', function(req, res, next) {
//     res.header('Content-Type', 'text/css');
//     next();
//   });

 //404 
// app.use(function (req, res) {
//     res.status(404).render("404.ejs");
//   });

  app.use((req, res, next) => {
    res.status(404).send("404");
  });


app.listen(port, () => console.log(`listening to port: ${port}`));
