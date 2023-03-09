import { Box } from "@mui/material";
import { useContext } from "react";
import { SocketContext } from "../../../src/context/SocketContext";

const UserList = () => {
    const { usersConnectedList, createNewRoom } = useContext(SocketContext);

    return ( 
        <Box>
            {usersConnectedList.map(user => 
                <Box 
                    key={user}
                    onClick={(e) => createNewRoom(user)}
                >
                    {user}
                </Box>
            )}
        </Box>
     );
}
 
export default UserList;