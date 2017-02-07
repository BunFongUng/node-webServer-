const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('upperText', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    let now = new Date().toString();

    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile('server.log', log + "\n", (err) => {
        if (err) {
            console.log('Unable to append to server.log file');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance', {
//         title: 'Website is in maintenance mode!'
//     });
// });

app.get('/', (req, res) => {
    res.send({
        name: 'BunFong',
        likes: [
            'Play video game',
            'watch movie',
            'play football',
            'watch youtube'
        ]
    });
});

app.get('/about-me', (req, res) => {
    res.render('about-me.hbs', {
        name: 'Bunfong',
        job: 'Web Developer',
        pageTitle: 'About Me'
    });
});

app.get('/not-found', (req, res) => {
    res.send({
        status: 'error',
        error: 'Something went wrong!'
    })
});

app.listen(port);