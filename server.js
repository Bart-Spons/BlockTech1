// const express = require('express');
// const app = express(); 
// const PORT = process.env.port || 1337;

// const chalk = require('chalk');
// import chalk from 'chalk';

// const warning = chalk.hex('#FFA500');

// app.get('/', onHome).listen(PORT, console.log(chalk.blue(`test de port: ${PORT}`)));

// function onHome(req, res){
//     res.send('Hallo')
// }

const express = require('express');
const app = express(); 
const PORT = process.env.port || 1337;
const chalk = require('chalk');

const warning = chalk.hex('#FFA500');

app.get('/', onHome).listen(PORT, () => {
    console.log(chalk.blue(`test de port: ${PORT}`));
});

function onHome(req, res){
    res.send('Hallo');
}