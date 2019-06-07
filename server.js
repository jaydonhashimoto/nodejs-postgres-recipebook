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
    })
});

//add route
app.post('/add', (req, res) => {
    pool.query('INSERT INTO recipes (name, ingredients, directions) VALUES ($1, $2, $3)', [req.body.name, req.body.ingredients, req.body.directions], (error, result) => {
        if (error) {
            console.log(error)
        }
        res.redirect('/');
    })
});

//delete route
app.post('/delete', (req, res) => {
    pool.query('DELETE FROM recipes WHERE id = $1', [req.body.id], (error, results) => {
        if (error) {
            console.log(error)
        }
        console.log(`Recipe: ${req.body.id} Deleted...`);
        res.redirect('/');
    })
});

//update route
app.post('/edit', (req, res) => {
    pool.query(
        'UPDATE recipes SET name = $1, ingredients = $2, directions = $3 WHERE id = $4',
        [req.body.name, req.body.ingredients, req.body.directions, req.body.id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.redirect('/');
        }
    )
});

//set static folder
app.use(express.static(path.join(__dirname, '/public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}...`));

