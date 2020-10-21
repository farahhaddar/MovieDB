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