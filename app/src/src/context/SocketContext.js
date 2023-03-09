import { createContext, useEffect, useState } from "react";
import io from 'socket.io-client';

const SocketContext = createContext();

const socket = io("http://localhost:8000");

const SocketProvider = ({ children }) => {
  const [usersConnectedList, setUsersConnectedList] = useState([])
  const [messagesList, setMessagesList] = useState([])
  
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
          console.log(usersConnectedListPayload);
          console.log('usersConnectedList', usersConnectedList);
          setUsersConnectedList([...usersConnectedListPayload]);
        })
        socket.on('responseAllMessages', messagesListPayload => { 
          setMessagesList([...messagesListPayload])
        })
    }, [])

    const sendMessage = (message, id) => {
        socket.emit('sendMessage', {
            message,
            id
        });
    }

    const createNewRoom = (userTosentId) => {
        socket.emit('createNewRoom', userTosentId);
    }

    return <SocketContext.Provider value={{
        socket,
        usersConnectedList,
        sendMessage,
        messagesList,
        setMessagesList,
        createNewRoom
    }}>{children}</SocketContext.Provider>;
}

export { SocketContext, SocketProvider };