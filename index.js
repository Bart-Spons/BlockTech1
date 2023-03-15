//Databse
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();

//Dit is voor de form
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Openen via localhost/1900
const port = 1900;

//Openbaar en ejs gebruiken
app.use(express.static("public"));
app.set("view engine", "ejs");

//Laad het wachtworod in van het .env bestand
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

//Dit is de startpagina
app.get("/", (req, res) => {
  res.locals.title = "Homepagina";
  res.locals.activehome = "active";
  res.locals.activezoek = "";
  res.locals.activematch = "";
  res.locals.activeaccount = "";
  res.render("index.ejs", { quotes });
});

//Dit is de account pagina
app.get("/account", (req, res) => {
  res.locals.title = "Account";
  res.locals.activehome = "";
  res.locals.activezoek = "";
  res.locals.activematch = "";
  res.locals.activeaccount = "active";
  res.render("account.ejs");
});

//Routing en people inladen
app.get("/add", (req, res) => {
  res.locals.title = "Toevoegen";
  res.locals.activehome = "";
  res.locals.activezoek = "active";
  res.locals.activematch = "";
  res.locals.activeaccount = "";
  res.render("add.ejs");
});

//Specifiek mijn database zoeken in MongDB
const database = client.db("BackEnd");
const collection = database.collection("Bart");

//Filter pagina
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

//Filter toepassen
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
    //Gegevens komen overeen met de database van MongoDB
    naam: req.body.naam,
    positie: req.body.positie,
    woonplaats: req.body.woonplaats
  };
  collection.insertOne(person, () => {
    // Redirect to the serach page to show the updated collection
    res.redirect("/search", { person });
  });
});

//De 404 pagina
app.use((req, res) => {
  res.locals.title = "404";
  res.locals.activehome = "";
  res.locals.activezoek = "";
  res.locals.activematch = "";
  res.locals.activeaccount = "";
  res.status(404).render('404.ejs');
});

//Zorgt ervoor dat je via de terminal de localhost kan starten op de 'port'
app.listen(port, () => {
  console.log(`Ga naar de poort: ${port}`)
});