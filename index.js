const express  = require('express')
const http = require("http");
const app = express();

const host = "localhost";
const port = 1900;

app.use(express.static("public"));
app.set("view engine", "ejs");

// lijst met namen inladen in de liked.ejs pagina
const people = [
  { name: 'John', age: 30 },
  { name: 'Jens', age: 25 },
  { name: 'Bob', age: 40 }
];

// hello world test
app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  // routing
app.get("/liked", (req, res) => {
    // res.render("liked.ejs", { data: port });
    res.render("liked.ejs", { people });
  });

  


  app.use((req, res, next) => {
    res.status(404).send("404");
  });


app.listen(port, () => console.log(`listening to port: ${port}`));
