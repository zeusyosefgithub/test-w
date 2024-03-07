const express = require('express');
const app = express();
const { Client, LocalAuth, MessageMedia, RemoteAuth, NoAuth } = require('whatsapp-web.js');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');

const conniction = "mongodb+srv://yosefmidlig20:UooPUUjoXgvbiSKM@cluster0.7tvt3ji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let qrCodeData = null;
let client;

mongoose.connect(conniction);
const db = mongoose.connection;
db.once("open", () => {
    console.log('MongoDB connected');
    const store = new MongoStore({ mongoose: mongoose });
    client = new Client({
        authStrategy: new RemoteAuth({
            clientId: 'admin-client',
            store,
            backupSyncIntervalMs: 300000
        }),
        puppeteer: {
            headless: false,
            args: ['--no-sandbox']
        },
    });
    //client.initialize();

    client.on('qr', (qr) => {
        console.log(qr);
        qrCodeData = qr;
        qrcode.generate(qr, { small: true });
    })

    client.on('ready', () => {
        console.log('WhatsApp client is ready!');
    });

    client.on('authenticated', (session) => {
        // Save the session object however you prefer.
        // Convert it to json, save it to a file, store it in a database...
        console.log("authenticated");
    });

    client.on('remote_session_saved', () => {
        console.log('Remote Session Saved');
    });
})

app.get('/',(req,res) => {
    res.send('welcome');
});

app.get('/api/get-qr-code', (req, res) => {
    if (qrCodeData) {
      res.status(200).json({ qrCode: qrCodeData });
    } else {
      res.status(404).json({ message: 'QR code not available yet' });
    }
  });

app.post('/api/sendWhatsupMessage', async (req, res) => {
    const data = req.body;
    const number = "+972506742582";
    const image = await new MessageMedia("image/jpeg", data.url, "image.jpg");
    const chatId = number.substring(1) + "@c.us";
    await client.sendMessage(chatId, image, { caption: "فاتورة " + data.name });
    res.send('123');
});

const PORT = process.env.PORT || 5000; app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;