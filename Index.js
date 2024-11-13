
const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const bot = new TelegramBot('7525920982:AAEu0a8AFeZ90JLDuRvr6GDdUfjT_QBTWUA', {polling: false});
const CHANNEL_ID = '-1002280600440';

// הוספת נתיב בסיסי
app.get('/', (req, res) => {
    res.send('Server is running! 🚀');
});

app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;

        const message = `
🎯 התקבל טופס חדש!

👤 פרטי הפונה:
${Object.entries(formData)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')}

⏰ זמן קבלה: ${new Date().toLocaleString('he-IL')}
        `;

        await bot.sendMessage(CHANNEL_ID, message);
        res.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
