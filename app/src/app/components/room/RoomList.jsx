import { Box } from "@mui/material";
import { useContext } from "react";
import { SocketContext } from "../../../src/context/SocketContext";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
    const { roomsList, socket } = useContext(SocketContext);
    const navigate = useNavigate();
    
    const showUser = (usersList) => {
        return usersList.find(user => user !== socket.id)
    }

    return ( 
        <Box>
            <Box
                onClick={() => navigate(`/rooms/1`)}
            >
                <p>Main room</p>
            </Box>
            {roomsList.map(room => 
                <Box 
                    key={room.id}    
                    onClick={() => navigate(`/rooms/${room.id}`)}
                >
                        <p>id: {room.id}</p>
                        <p>with : {showUser(room.usersList)}</p>
                </Box>
            )}
        </Box>
     );
}
 
export default RoomList;