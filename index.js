const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
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
  { name: 'Samantha', age: 21 }
];


// Laad het wachtworod in van het .env bestand
require('dotenv').config();

const password = process.env.PASSWORD;

const uri = "mongodb+srv://bartspons31:" + password + "@cluster0.0r8mcrj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//filer


//API 
let quotes;
const request = require('request');
var category = 'success';
request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
  headers: {
    'X-Api-Key': 'NSPYPZBVLJoPjB7ugsSq2Q==IkXme4SJceLYrhXX'
  },
}, function (error, response, body) {
  if (error) return console.error('Request failed:', error);
  else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else {
    const quote = body.split(`"`)
    console.log(quote[3]);
    quotes = quote[3];
  }
});


// Dit is de startpagina
app.get("/", (req, res) => {
  res.locals.title = "Homepagina";
  res.render("index.ejs", { quotes });

});
app.get("/index", (req, res) => {
  res.locals.title = "Homepagina";
  res.render("index.ejs", { people, quotes });

});

// routing en people inladen
const path = require('path');

app.get("/liked", (req, res) => {
  // res.render("liked.ejs", { data: port });
  res.locals.title = "Liked";
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




//uit database halen
app.get('/people', (req, res) => {
  const database = client.db("BackEnd");
  const collection = database.collection("Bart");

  let query = {};

  if (req.query.positie) {
    const positie = req.query.positie;
    query = { positie: positie };
  }
  
  collection.find(query).toArray().then((result) => {
    res.send(result);
  });
});



//database
const database = client.db("BackEnd");
const collection = database.collection("Bart");

//filter pagina
app.get("/test", (req, res) => {
  collection.find({}).toArray().then((people) => {
    res.locals.title = "test";
    res.render("test.ejs", { people });
  });
});

//filter toepassen
app.post("/test", (req, res) => {
  const positie = req.body.positie;

  collection.find({ positie }).toArray().then((people) => {
    res.locals.title = "test";
    res.render("test.ejs", { people });
  });
});

// Comfortabel met het feit dat je het niet snapt - Robert



//de 404 pagina
app.use((req, res, next) => {
  res.status(404).send("404");
});


app.listen(port, () => console.log(`Ga naar de poort: ${port}`));