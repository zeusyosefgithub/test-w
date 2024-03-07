const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

app.post('/req', (req,res) => {
    res.send(req.body)
});

const PORT = process.env.PORT || 5000; app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});