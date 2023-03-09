import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../../src/context/SocketContext";

const FormMessage = () => {
    const [message, setMessage] = useState("");
    const { sendMessage } = useContext(SocketContext);
    const { id } = useParams();

    const handleChange = (e) => {
        const { value } = e.target;
        setMessage(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message, id);
    }

    return ( 
        <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <TextField
                id="message"
                label="Your message"
                rows={4}
                sx={{
                    width: "100%",
                }}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                Send
            </Button>
        </Box>
     );
}
 
export default FormMessage;