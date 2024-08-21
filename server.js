const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Replace with your Discord webhook URL
const discordWebhookUrl = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/log-ip', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const log = `IP: ${ip}, Time: ${new Date().toISOString()}`;

    // Send the IP address to the Discord webhook
    axios.post(discordWebhookUrl, {
        content: log
    })
    .then(() => {
        res.status(200).send('IP Logged');
    })
    .catch(err => {
        console.error('Failed to send to Discord:', err);
        res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
