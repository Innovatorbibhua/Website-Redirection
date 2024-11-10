const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;

// Allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());

app.post('/log_ip', (req, res) => {
    const ip = req.body.ip;
    fs.appendFile('ip_log.txt', `${ip}\n`, (err) => {
        if (err) throw err;
        console.log('IP logged:', ip);
    });
    res.sendStatus(200);
});

app.post('/upload_media', upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'video', maxCount: 1 }]), (req, res) => {
    console.log('Media files received:', req.files);
    res.sendStatus(200);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});
