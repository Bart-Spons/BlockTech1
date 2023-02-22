// const express = require('express');
// const app = express(); 
// const expbs = require('express-handlebars');

// app.engine('handlebars', expbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// //Routing
// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.listen(8000, () => {
//     console.log('server is starting at port ', 8000);
// });

import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000);