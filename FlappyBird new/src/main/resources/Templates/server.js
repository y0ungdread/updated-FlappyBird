const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let score = 0;

// Передача HTML-сторінки
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Приймання результатів гри та оновлення сторінки
io.on('connection', (socket) => {
    console.log('a user connected');

    // Оновлення результатів гри
    socket.on('updateScore', (newScore) => {
        score = newScore;
        io.emit('scoreUpdated', score);
    });

    // Відключення користувача
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Запуск сервера
const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
