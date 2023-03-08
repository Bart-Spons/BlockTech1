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
  { name: 'Samantha', age: 21 }
];


//filer


//mongoDB

//API 
let quotes;
const request = require('request');
var category = 'success';
request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
  headers: {
    'X-Api-Key': 'NSPYPZBVLJoPjB7ugsSq2Q==IkXme4SJceLYrhXX'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else {
    const quote = body.split(`"`)
    console.log(quote[3]);
    quotes = quote[3];
  }
});


// hello world test, dit is de startpagina
app.get("/", (req, res) => {
  res.locals.title = "Homepagina";    
  res.render("index.ejs");

  });
app.get("/index", (req, res) => {
  res.locals.title = "Homepagina";    
  res.render("index.ejs", { people, quotes});

  });

// routing en people inladen
const path = require('path');

app.get("/liked", (req, res) => {
    // res.render("liked.ejs", { data: port });
    res.locals.title = "Liked";
    res.render("liked.ejs", { people }); 
  });

  app.get("/test", (req, res) => {
    // res.render("liked.ejs", { data: port });
    res.locals.title = "test";
    // dit zorgt ervoor dat de filer 21 jaar is
    const filteredPeople = people.filter(person => person.age === 21);    
    res.render("test.ejs", { filteredPeople }); 
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
