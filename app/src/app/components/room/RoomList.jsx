import { Box } from "@mui/material";
import { useContext } from "react";
import { SocketContext } from "../../../src/context/SocketContext";

const RoomList = () => {
    const { roomsList, socket } = useContext(SocketContext);

    const showUser = (usersList) => {
        return usersList.find(user => user !== socket.id)
    }

    return ( 
        <Box>
            {roomsList.map(room => 
                <Box key={room.id}>
                        <p>id: {room.id}</p>
                        <p>with : {showUser(room.usersList)}</p>
                </Box>
            )}
        </Box>
     );
}
 
export default RoomList;