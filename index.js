const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();

//dit is voor form.ejs
const bodyParser = require('body-parser');

//openen via localhost/1900
const port = 1900;

app.use(express.static("public"));
app.set("view engine", "ejs");

// Laad het wachtworod in van het .env bestand
require('dotenv').config();

const password = process.env.PASSWORD;

const uri = "mongodb+srv://bartspons31:" + password + "@cluster0.0r8mcrj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


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
  res.locals.activehome = "active";
  res.locals.activezoek = "";
  res.locals.activematch = "";
  res.locals.activeaccount = "";
  res.render("index.ejs", { quotes });
});

app.get("/account", (req, res) => {
  res.locals.title = "Account";
  res.locals.activehome = "";
  res.locals.activezoek = "";
  res.locals.activematch = "";
  res.locals.activeaccount = "active";
  res.render("account.ejs");
});

// routing en people inladen
app.get("/add", (req, res) => {
  res.locals.title = "Toevoegen";
  res.locals.activehome = "";
  res.locals.activezoek = "active";
  res.locals.activematch = "";
  res.locals.activeaccount = "";
  res.render("add.ejs");
});

//form laten werken
app.use(bodyParser.urlencoded({ extended: true }));

//database 
const database = client.db("BackEnd");
const collection = database.collection("Bart");

//filter pagina
app.get("/search", (req, res) => {
  collection.find({}).toArray().then((people) => {
    res.locals.title = "Search";
    res.locals.activehome = "";
    res.locals.activezoek = "";
    res.locals.activematch = "active";
    res.locals.activeaccount = "";
    res.render("search.ejs", { people });
  });
});

//filter toepassen
app.post("/search", (req, res) => {
  res.locals.title = "Search";
  res.locals.activehome = "";
  res.locals.activezoek = "";
  res.locals.activematch = "active";
  res.locals.activeaccount = "";

  const positie = req.body.positie;

  collection.find({ positie }).toArray().then((people) => {
    res.render("search.ejs", { people });
   });
});

app.post("/addPerson", (req, res) => {
  const person = {
    naam: req.body.naam,
    positie: req.body.positie,
    woonplaats: req.body.woonplaats
  };

  

  collection.insertOne(person, () => {
    // Redirect to the serach page to show the updated collection
    res.redirect("/search", { person });
  });
});

//de 404 pagina
app.use((req, res) => {
  res.status(404).send("404, foute pagina");
});


app.listen(port, () => {
  console.log(`Ga naar de poort: ${port}`)
});