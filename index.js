const express = require('express');
const port = 3000;
const app = express();
var d = new Date();

app.listen(port, function() {
    console.log("Server is running on " + port + " port");
});
app.get('/', function(req, res) {
    res.send('ok');
});
app.get("/test", function(req, res) {
    res.send({ status: 200, message: "ok" });
});
app.get("/time", function(req, res) {
    res.send({ status: 200, message: d.getHours() + ":" + d.getSeconds() });
});
app.get('/hello/:id', function(req, res) {
    res.send({
        status: 200,
        message: "Hello," +
            req.params.id
    });
});
app.get('/hello', function(req, res) {
    res.send({ status: 200, message: "Hello" });
});
app.get('/search', (req, res) => {
    const search = req.query.s;

    if (typeof search != 'undefined') {

        const response = {
            status: 200,
            message: "ok",
            data: search
        };

        res.send(response);
    } else {
        const response = {
            status: 500,
            error: true,
            message: "you have to provide a search"
        };


        res.status(500);
        res.send(response);
    }
});
const movies = [
    { title: "Jaws", year: 1975, rating: 8 },
    { title: "Avatar", year: 2009, rating: 7.8 },
    { title: "Brazil", year: 1985, rating: 8 },
    { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
];
app.get("/movies/add", function(req, res) { res.send({ status: 200, message: "Hello" }); });

app.get("/movies/get", function(req, res) {
    res.send({ status: 200, data: movies });

});

app.get("/movies/edit", function(req, res) { res.send({ status: 200, message: "Hello" }); });

app.get("/movies/delete", function(req, res) { res.send({ status: 200, message: "Hello" }); });


app.get("/movies/read/by-date", function(req, res) {
    res.send({
        status: 200,
        data: movies.sort(function(a, b) {
            return a.year - b.year;
        })
    });
});

app.get("/movies/read/by-rating", function(req, res) {
    res.send({
        status: 200,
        data: movies.sort(function(a, b) {
            return b.rating - a.rating;
        })
    });
});
app.get("/movies/read/by-title", function(req, res) {
    res.send({
        status: 200,
        data: movies.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        })
    });
});

app.get("/movies/read/id/:id", function(req, res) {
    var x = req.params.id;
    if (x <= movies.length) {
        res.send({ status: 200, data: movies[x] });

    } else {
        res.send({
            status: 404,
            error: true,
            message: 'the movie  ' + x + ' does not exist '
        });

    }

});