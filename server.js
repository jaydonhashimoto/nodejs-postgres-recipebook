const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { Pool } = require('pg');

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
const connectionString = 'postgresql://jaydon:root@localhost:5432/recipebook';

const pool = new Pool({
    connectionString: connectionString,
});

// const pool = new Pool({
//     user: 'jaydon',
//     host: 'localhost',
//     database: 'recipebook',
//     password: 'root',
//     port: 5433,
// })

//homepage route
app.get('/', (req, res) => {
    pool.query('SELECT * FROM recipes', (err, result) => {
        if (err) {
            console.log(err)
        }
        res.render('home', { recipes: result.rows });
        pool.end()
    })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}...`));

