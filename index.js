const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

app.post('/req', (req,res) => {
    console.log(req.body.id);
    res.send('123');
});

const PORT = process.env.PORT || 5000; app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});