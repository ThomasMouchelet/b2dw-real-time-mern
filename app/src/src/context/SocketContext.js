import { createContext, useEffect, useState } from "react";
import io from 'socket.io-client';

const SocketContext = createContext();

const socket = io("http://localhost:8000");

const SocketProvider = ({ children }) => {
  const [usersConnectedList, setUsersConnectedList] = useState([])
  const [messagesList, setMessagesList] = useState([])
  const [roomsList, setRoomsList] = useState([])
  
  useEffect(() => {
        socket.on('connect', () => {
          console.log('connected');
        });
    
        socket.on('disconnect', () => {
          console.log('disconnected');
        })
        socket.on('responseNewRoom', room => {
          console.log(room);
          
        })
        socket.on('responseAllusersConnectedList', usersConnectedListPayload => {
          const usersConnectedListPayloadFilter = usersConnectedListPayload.filter(user => user !== socket.id)

          setUsersConnectedList([...usersConnectedListPayloadFilter]);
        })
        socket.on('responseAllMessages', messagesListPayload => { 
          setMessagesList([...messagesListPayload])
        })
        socket.on('responseCreateRoom', data => {
          console.log('responseCreateRoom data', data);
          // set in state roomList
          setRoomsList([...data])
        })
    }, [])

    const sendMessage = (message, id) => {
        socket.emit('sendMessage', {
            message,
            id
        });
    }

    const createNewRoom = (userTosentId) => {
      console.log('userTosentId', userTosentId);
      socket.emit('createNewRoom', userTosentId);
    }

    return <SocketContext.Provider value={{
        socket,
        usersConnectedList,
        sendMessage,
        messagesList,
        setMessagesList,
        createNewRoom,
        roomsList
    }}>{children}</SocketContext.Provider>;
}

export { SocketContext, SocketProvider };