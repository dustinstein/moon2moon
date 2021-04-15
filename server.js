const express = require('express');
const path = require("path");
const enforce = require('express-sslify');
const port = process.env.PORT || 8080;
const app = express();


app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/docs/:file', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', req.params.file))
});
app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'index.html'))
});


app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
    console.log('Server listening on port '+ port);
});

console.log('Server started!');
