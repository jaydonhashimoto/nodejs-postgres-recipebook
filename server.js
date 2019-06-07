const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const pg = require('pg');

const app = express();

//init body parser middleware
app.use(express.json());
//handles form submissions and url encoded data
app.use(express.urlencoded({ extended: false }));

//init handlebars middleware
//set template engine to handlebars and setting default layout to main
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
//set view engine
app.set('view engine', 'handlebars');

//db connection string
const connectionString = 'postgresql://jaydon:root@localhost/recipebook';



