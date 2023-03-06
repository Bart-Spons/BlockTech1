const express  = require('express')
const http = require("http");
const app = express();

//dit is voor form.ejs
const bodyParser = require('body-parser');

//openen via localhost/1900
const host = "localhost";
const port = 1900;

app.use(express.static("public"));
app.set("view engine", "ejs");

// lijst met namen inladen in de liked.ejs pagina
const people = [
  { name: 'Thijmen', age: 30 },
  { name: 'Jens', age: 25 },
  { name: 'Bryan', age: 40 }
];

//mongoDB


// hello world test, dit is de startpagina
app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  // routing en people inladen
app.get("/liked", (req, res) => {
    // res.render("liked.ejs", { data: port });
    res.render("liked.ejs", { people });
  });

  //form  
  app.use(bodyParser.urlencoded({ extended: true }));

app.get('/form', (req, res) => {
  res.render('form.ejs');
});

app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  
  
  res.send(`Name: ${name}, Email: ${email}`);
});
  

//de 404 pagina
  app.use((req, res, next) => {
    res.status(404).send("404");
  });


app.listen(port, () => console.log(`Ga naar de poort: ${port}`));
