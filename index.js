// step 2
const { response } = require('express');
const express = require('express');
const port = 3000;
const app = express();
// step 3 var 
var d = new Date();

app.listen(port, function() {
    console.log("Server is running on " + port + " port");
});
app.get('/', function(req, res) {
    res.send('ok');
});
// end of step 2

// step 3
app.get("/test", function(req, res) {
    res.send({ status: 200, message: "ok" });
});
app.get("/time", function(req, res) {
    res.send({ status: 200, message: d.getHours() + ":" + d.getSeconds() });
});
// end of step 3 

//step 4
// hello parameter
app.get('/hello/:id', function(req, res) {
    res.send({
        status: 200,
        message: "Hello," +
            req.params.id
    });
});
//hello 
app.get('/hello', function(req, res) {
    res.send({ status: 200, message: "Hello" });
});
//search quary
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

// end of step 4

//step 5 
// array
const movies = [
    { title: "Jaws", year: 1975, rating: 8 },
    { title: "Avatar", year: 2009, rating: 7.8 },
    { title: "Brazil", year: 1985, rating: 8 },
    { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
];

//create function  step 8 updated 
app.get("/movies/add", function(req, res) {
    let movieTitle = req.query.title;
    let movieYear = req.query.year;
    let movieRating = req.query.rating;


    if (movieTitle == null || isNaN(movieYear) || typeof movieYear === "undefined" || movieYear.toString().length != 4) {
        res.send({
            status: 403,
            error: true,
            message: 'you cannot create a movie without providing a title and a year'
        });


    } else if (movieRating == " " || typeof movieRating === "undefined") {
        var x = 4;

        movies.push({
            title: movieTitle,
            year: movieYear,
            rating: x,
        });
        res.send(movies);
    } else {
        movies.push({
            title: movieTitle,
            year: movieYear,
            rating: movieRating
        });
        res.send({
            status: 200,
            data: movies
        });
    }
});
// end of create function 

// read function 
app.get("/movies/get", function(req, res) {
    res.send({ status: 200, data: movies });

});
// end of read function 

//update function  step 10 updated 

app.get("/movies/edit/:id", function(req, res) {
    let x = req.params.id;
    let t = req.query.title;
    let y = req.query.year;
    let r = req.query.rating;

    if (x < 0 || x >= movies.length) {
        res.send('invalid id');
    }
    if (t != null) { movies[x].title = t; }
    if (y != null) {
        movies[x].year = y;
    }
    if (r != null) {
        movies[x].rating = r;
    }
    res.send(movies);
});


// end of update function 

//delete fn  updated to step 9 
app.get('/movies/delete/:id', function(req, res) {
    let x = req.params.id;
    if (x >= movies.length || x < 0) {
        res.send({
            status: 404,
            error: true,
            message: 'the movie ' + x + 'does not exist '
        })

    } else {
        let v = movies
        v.splice(x, 1);
        res.send(v);
    }

});
//end of delete fn 
//end of step 5

// start of step 6 

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
// end of step 6 

//start of step 7
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
//end of step 7