const express = require('express');
const port = 3000;
const app = express();
var d = new Date();
app.listen(port, function() {
    console.log("Server is running on " + port + " port");
});
app.get('/', function(req, res) {
    res.send('ok')
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