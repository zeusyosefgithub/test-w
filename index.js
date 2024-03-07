const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

app.post('/req',urlencodedParser, (req,res) => {
    console.log(req.body);
    res.send('123');
});

const PORT = process.env.PORT || 5000; app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});