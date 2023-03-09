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

const getRommsList = (soketID) => {
    return roomsList.filter(room => room.usersList.includes(soketID))
}

const getCurrentSocketUserRoomsList = (socket) => {
    const myRoomList = getRommsList(socket.id)
    socket.emit("responseCreateRoom", myRoomList);
}

io.on('connection', (socket) => {
    usersConnectedList.push(socket.id);
    
    io.emit('responseAllusersConnectedList', usersConnectedList);

    getCurrentSocketUserRoomsList(socket)

    socket.on('createNewRoom', (userTosentId) => {
        console.log('my user id', socket.id);
        console.log('userTosentId', userTosentId);

        const room = roomsList.find(room => room.usersList.includes(userTosentId) && room.usersList.includes(socket.id))

        // if room not exist create new room
        if(!room) {
            // create room
            // add room to roomsList
            roomsList.push({
                id: roomsList.length + 1,
                usersList: [userTosentId, socket.id],
                messagesList: []
            })
        }
        
        const userTosentRommList = getRommsList(userTosentId)
        io.to(userTosentId).emit("responseCreateRoom", userTosentRommList);
        
        getCurrentSocketUserRoomsList(socket)
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