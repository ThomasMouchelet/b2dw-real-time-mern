const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});
const PORT = process.env.PORT || 8000;
const cors = require('cors');

app.use(cors())

const usersConnectedList = [];
const roomsList = [
    {
        id: 1,
        usersList: [],
        messagesList: []
    }
]

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/rooms/:id', (req, res) => {
    const { id } = req.params
    const room = roomsList.find(room => room.id === Number(id))
    res.send(room)
})

io.on('connection', (socket) => {
    usersConnectedList.push(socket.id);
    
    io.emit('responseAllusersConnectedList', usersConnectedList);
    // io.emit('responseAllMessages', messagesList);

    socket.on('createNewRoom', (userTosentId) => {
        const room = roomsList.find(room => room.usersList.includes(userTosentId) && room.usersList.includes(socket.id))

        if (room) {
            io.emit('responseNewRoom', room);
            const userToSent = room.usersList.find(user => user !== socket.id)
            io.to(userToSent).emit('responseNewRoom', room);
        } else {
            const newRoom = {
                id: roomsList.length + 1,
                usersList: [userTosentId, socket.id],
                messagesList: []
            }
            roomsList.push(newRoom)
            io.emit('responseNewRoom', newRoom);
        }
    })

    socket.on('sendMessage', (data) => {
        const { message, id } = data;
        const room = roomsList.find(room => room.id === Number(id))
        room.messagesList.push({
            owner_socker_id: socket.id,
            content: message
        })
        io.emit('responseAllMessages', room.messagesList);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        usersConnectedList.splice(usersConnectedList.indexOf(socket.id), 1);
        io.emit('responseAllusersConnectedList', usersConnectedList);
    })
});
  
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});