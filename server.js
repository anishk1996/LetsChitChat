const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;
const checkUserDb = require('./middleware/checkUser');
const saveMessageService = require('./services/saveMessage');
const getMessageService = require('./services/getMessage')
const dbName = 'chatApplication';

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
const dbConnection = require('./middleware/dbConnection')(dbName);
dbConnection.connect();

// Make db connection globally available
global.db = dbConnection


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
})

app.use(express.static(__dirname + '/public'))


app.get('/home', authUser, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

async function authUser(req, res, next) {
    let checkReq = await checkUserDb(req, res);
    if (checkReq === true) {
        next();
    } else {
        res.sendFile(__dirname + '/public/login.html');
    }
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/saveMessage', async (req, res) => {
    let result = await saveMessageService.saveMessagesDetails(req);
    res.send(result);
});

app.get('/getMessages', async (req, res) => {
    let result = await getMessageService.getMessagesDetails(req);
    res.send(result);
});

//socket code
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('Connected.........');
    socket.emit('bot', 'Welcome user');
    socket.broadcast.emit('bot', 'A user has entered the room');
    socket.on('message sent', (msg) => {
        socket.broadcast.emit('message sent', msg);
    })
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});