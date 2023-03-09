import { Box } from "@mui/material";
import { useContext } from "react";
import { SocketContext } from "../../../src/context/SocketContext";

const MessageList = () => {
    const { messagesList, socket } = useContext(SocketContext);
    return ( 
        <Box>
            {messagesList.map(message => 
                <Box 
                    key={message}
                    sx={{
                        backgroundColor: message.owner_socker_id === socket.id ? "blue" : "red"
                    }}
                >
                    {message.content}
                </Box>
            )}
        </Box> 
    );
}
 
export default MessageList;