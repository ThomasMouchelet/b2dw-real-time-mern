import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SocketContext } from '../../src/context/SocketContext';
import FormMessage from '../components/form/FormMessage';
import MessageList from '../components/message/MessageList';
import RoomList from '../components/room/RoomList';
import UserList from '../components/user/UserList';

const ChatPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setMessagesList, setCurrentRoom, updateRoomData } = useContext(SocketContext);

    useEffect(() => {
        if(!id) navigate('/rooms/1')
        fetchRoomById()
    },[id])

    useEffect(() => {
        if(!updateRoomData.id) return;
        setMessagesList([...updateRoomData.messagesList])
    }, [updateRoomData])

    const fetchRoomById = async () => {
        try {
            const response = await fetch(`http://localhost:8000/rooms/${id}`)
            const room = await response.json();
            setMessagesList([...room.messagesList])
            setCurrentRoom(room)
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <Container>
            <Grid
                container
                spacing={2}
            >
                <Grid item xs={2}>
                    <RoomList />
                </Grid>
                <Grid item xs={8}>
                    <Box
                        sx={{
                            height: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            borderLeft: 1,
                            borderRight: 1,
                            position: "relative",
                        }}
                    >
                        <MessageList />
                        <FormMessage />
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <UserList />
                </Grid>
            </Grid>
        </Container>
     );
}
 
export default ChatPage;