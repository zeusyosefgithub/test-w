const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

app.post('/', function(req, res) {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    res.send(req.body);
});

const PORT = process.env.PORT || 5000; app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});