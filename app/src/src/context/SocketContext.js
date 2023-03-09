import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from 'socket.io-client';

const SocketContext = createContext();

const socket = io("http://localhost:8000");

const SocketProvider = ({ children }) => {
  const [usersConnectedList, setUsersConnectedList] = useState([])
  const [messagesList, setMessagesList] = useState([])
  const [roomsList, setRoomsList] = useState([])
  const [currentRoom, setCurrentRoom] = useState({})
  const [updateRoomData, setUpdateRoomData] = useState({})
  
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
        socket.on('responseAllMessages', roomPayload => { 
          setUpdateRoomData({...roomPayload})
        })
        socket.on('responseCreateRoom', data => {
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
        roomsList,
        setCurrentRoom,
        updateRoomData
    }}>{children}</SocketContext.Provider>;
}

export { SocketContext, SocketProvider };