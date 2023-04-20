import React from "react";
import io from "socket.io-client";
import { MuiThemeProvider } from "@material-ui/core/styles";
import
{
    Button, TextField, Dialog, DialogTitle, DialogContent, Typography, Radio, RadioGroup, FormControlLabel
} from "@material-ui/core";
import TopBar from "./topbar";
import Logo from "./logo";
import UserList from "./userlist";
import MessageBubbleList from "./messagebubblelist";
import theme from "./theme";
import "./app.css";

class App extends React.PureComponent
{
    state =
    {
        socket: null,
        isLoggedIn: false,
        rooms: [],
        chatName: "",
        chatNameMessage: "Enter a username",
        roomName: "",
        roomNameMessage: "Enter a room name",
        isWhosOnlineDialogOpen: false,
        roomNameChange: "",
        roomNameChangeMessage: "Enter a room name",
        isChangeRoomDialogOpen: false,
        sockets: [],
        messages: [],
        message: "",
        messageMessage: "",
        isTyping: false
    }

    componentDidMount = () =>
    {
        const socket = io.connect("http://localhost:5000");
        this.setState({ socket: socket });
        socket.on("rooms", this.onRooms);
        socket.on("namechange", this.onNameChange);
        socket.on("welcome", this.onWelcome);
        socket.on("message", this.onMessage);
        socket.on("whosonlinedialog", this.onWhosOnlineDialog);
        socket.on("typing", this.onTyping);
        socket.emit("rooms");
    }

    onRooms = dataFromServer =>
    {
        this.setState({ rooms: dataFromServer });
    }

    onNameChange = dataFromServer =>
    {
        this.setState({ chatNameMessage: dataFromServer});
    }

    onWelcome = dataFromServer =>
    {
        this.onMessage(dataFromServer);
        this.setState({ isLoggedIn: true });
    }

    onWhosOnlineDialog = dataFromServer =>
    {
        this.setState({ sockets: dataFromServer });
    }

    onMessage = dataFromServer =>
    {
        this.setState({ messageMessage: "", isTyping: false });

        if (this.state.message !== "")
        {
            this.setState({ isTyping: true });
            this.state.socket.emit("typing");
        }

        this.setState(previousState =>
        {
            let messages = [...previousState.messages];
            messages.push(dataFromServer);
            return { messages };
        });
    }

    onTyping = dataFromServer =>
    {
        this.setState({ messageMessage: dataFromServer });
    }

    handleNameChange = e =>
    {
        this.setState({ chatName: e.target.value });
        this.state.socket.emit("namechange", { chatName: e.target.value });
    }

    handleRoomChange = e =>
    {
        if (e.target.value !== "")
        {
            this.setState({ roomName: e.target.value, roomNameMessage: "" });
        }
        else
        {
            this.setState({ roomName: e.target.value, roomNameMessage: "Enter a room name" });
        }
    }

    handleRoomChangeChange = e =>
    {
        if (e.target.value.toUpperCase() === this.state.roomName)
        {
            this.setState({ roomNameChange: e.target.value, roomNameChangeMessage: "You are already in this room" });
        }
        else if (e.target.value !== "")
        {
            this.setState({ roomNameChange: e.target.value, roomNameChangeMessage: "" });
        }
        else
        {
            this.setState({ roomNameChange: e.target.value, roomNameChangeMessage: "Enter a room name" });
        }
    }

    handleLoginKeyPress = e =>
    {
        if (e.charCode === 13 && this.state.chatNameMessage === "" && this.state.roomNameMessage === "")
        {
            this.handleLogin();
        } 
    }

    handleLogin = () =>
    {
        this.setState({ roomName: this.state.roomName.toUpperCase() })
        this.state.socket.emit("login", { chatName: this.state.chatName, roomName: this.state.roomName });
    }

    handleChangeRoomKeyPress = e =>
    {
        if (e.charCode === 13 && this.state.roomNameChangeMessage === "")
        {
            this.handleChangeRoom();
        } 
    }

    handleChangeRoom = () =>
    {
        this.setState({ messages: [] })
        this.state.socket.emit("changeroom", { roomNameChange: this.state.roomNameChange.toUpperCase() });
        this.setState(
            {
                roomName: this.state.roomNameChange.toUpperCase(),
                roomNameChange: "",
                roomNameChangeMessage: "Enter a room name",
                isChangeRoomDialogOpen: false
            });
    }

    handleLogout = () =>
    {
        this.state.socket.disconnect();
        this.setState(
            { 
                isLoggedIn: false,
                chatName: "",
                chatNameMessage: "Enter a username",
                roomName: "",
                roomNameMessage: "Enter a room name",
                roomNameChange: "",
                roomNameChangeMessage: "Enter a room name",
                messages: [],
                message: "",
                messageMessage: "",
                isTyping: false
            });
        const socket = io.connect("localhost:5000", { forceNew: true });
        this.setState({ socket: socket });
        socket.on("rooms", this.onRooms);
        socket.on("namechange", this.onNameChange);
        socket.on("welcome", this.onWelcome);
        socket.on("message", this.onMessage);
        socket.on("whosonlinedialog", this.onWhosOnlineDialog);
        socket.on("typing", this.onTyping);
        socket.emit("rooms");
    }

    handleMessageChange = e =>
    {
        this.setState({ message: e.target.value });

        if (this.state.isTyping === false)
        {
            this.setState({ isTyping: true });
            this.state.socket.emit("typing");
        }
    }

    handleSendMessage = e =>
    {
        if (e.key === "Enter" && this.state.message !== "")
        {
            this.state.socket.emit("message", { text: this.state.message });
            this.setState({ message: "", isTyping: false });
        }
    }

    handleOpenChangeRoomDialog = () =>
    {
        this.state.socket.emit("rooms");
        this.setState({ isChangeRoomDialogOpen: true });
    }

    handleCloseChangeRoomDialog = () =>
    {
        this.setState({ roomNameChange: "", roomNameChangeMessage: "Enter a room name", isChangeRoomDialogOpen: false });
    }

    handleOpenWhosOnlineDialog = () =>
    {
        this.state.socket.emit("whosonlinedialog");
        this.setState({ isWhosOnlineDialogOpen: true });
    }

    handleCloseWhosOnlineDialog = () =>
    {
        this.setState({ isWhosOnlineDialogOpen: false });
    }
    
    render()
    {
        const
        {
            isLoggedIn,
            rooms,
            chatName,
            chatNameMessage,
            roomName,
            roomNameMessage,
            isWhosOnlineDialogOpen,
            roomNameChange,
            roomNameChangeMessage,
            isChangeRoomDialogOpen,
            sockets,
            messages,
            message,
            messageMessage
        } = this.state;
        return (
            <MuiThemeProvider theme={ theme }>
                <React.Fragment>
                    <TopBar
                        roomName={ roomName }
                        handleOpenChangeRoomDialog={ this.handleOpenChangeRoomDialog }
                        isLoggedIn={ isLoggedIn }
                        handleLogout={ this.handleLogout }
                        handleOpenWhosOnlineDialog={ this.handleOpenWhosOnlineDialog }/>
                    <Dialog open={ isChangeRoomDialogOpen}  onClose={ this.handleCloseChangeRoomDialog }>
                        <DialogTitle style={{ textAlign: "center" }}>Change Room</DialogTitle>
                        <DialogContent>
                            <div style={{ textAlign: "center" }}>
                                <TextField
                                    style={{ marginTop: "15px" }}
                                    onChange={ this.handleRoomChangeChange }
                                    onKeyPress={ this.handleChangeRoomKeyPress }
                                    placeholder="Room Name"
                                    required
                                    value={ roomNameChange }
                                    inputProps={{ maxLength: 20 }}
                                    error={ roomNameChangeMessage !== "" }
                                    helperText={ roomNameChangeMessage }/>
                                <Typography style={{ marginTop: "15px" }} color="primary">Existing rooms:</Typography>
                                <RadioGroup
                                    style={{ alignContent: "center", marginTop: "5px" }}
                                    onChange={ this.handleRoomChangeChange }
                                    onKeyPress={ this.handleChangeRoomKeyPress }
                                    value={ roomNameChange }>
                                    {
                                        rooms.map((room, index) => 
                                            room !== roomName &&
                                            <FormControlLabel
                                                key={ index }
                                                value={ room }
                                                control={ <Radio color="primary" /> }
                                                label={ room }/>
                                            )
                                    }
                                </RadioGroup>
                                <Button
                                    style={{ marginTop: "15px" }}
                                    onClick={ this.handleChangeRoom }
                                    color="primary"
                                    variant="contained"
                                    disabled={ roomNameChangeMessage !== "" }>
                                    Change Room
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={ isWhosOnlineDialogOpen } onClose={ this.handleCloseWhosOnlineDialog }>
                        <DialogTitle style={{ textAlign: "center" }}>Who"s Online?</DialogTitle>
                        <DialogContent>
                            <UserList users={ sockets } chatName={ chatName } />
                        </DialogContent>
                    </Dialog>
                    {
                        !isLoggedIn &&
                            <div style={{ textAlign: "center" }}>
                                <Logo color="primary" size="100" />
                                <Typography variant="h4" color="primary">Login</Typography>
                                <TextField
                                    style={{ marginTop: "30px" }}
                                    onChange={ this.handleNameChange }
                                    onKeyPress={ this.handleLoginKeyPress }
                                    placeholder="Chat Name"
                                    autoFocus={true}
                                    required
                                    value={ chatName }
                                    inputProps={{ maxLength: 20 }}
                                    error={ chatNameMessage !== "" }
                                    helperText={ chatNameMessage }/>
                                <br />
                                <TextField
                                    style={{ marginTop: "15px" }}
                                    onChange={ this.handleRoomChange }
                                    onKeyPress={ this.handleLoginKeyPress }
                                    placeholder="Room Name"
                                    required
                                    value={ roomName }
                                    inputProps={{ maxLength: 20 }}
                                    error={ roomNameMessage !== "" }
                                    helperText={ roomNameMessage }/>
                                <Typography style={{ marginTop: "15px" }} color="primary">Existing rooms:</Typography>
                                <RadioGroup
                                    style={{ alignContent: "center", marginTop: "5px" }}
                                    onChange={ this.handleRoomChange }
                                    onKeyPress={ this.handleLoginKeyPress }
                                    value={ roomName }>
                                    {
                                        rooms.map((room, index) =>
                                            <FormControlLabel
                                                key={ index }
                                                value={ room }
                                                control={ <Radio color="primary" /> }
                                                label={ room }/>
                                            )
                                    }
                                </RadioGroup>
                                <Button
                                    style={{ marginTop: "15px" }}
                                    onClick={ this.handleLogin }
                                    color="primary"
                                    variant="contained"
                                    disabled={ chatNameMessage !== "" || roomNameMessage !== "" }>
                                    Login
                                </Button>
                            </div>
                    }
                    {
                        isLoggedIn &&
                        <div>
                            <div className="messageList">
                                <MessageBubbleList messages={ messages } chatName={ chatName } />
                            </div>
                            <TextField
                                style={{ position: "absolute", bottom: "10px", width: "calc(100% - 15px)" }}
                                onChange={ this.handleMessageChange }
                                onKeyPress={ this.handleSendMessage }
                                placeholder="Message"
                                autoFocus
                                required
                                value={ message }
                                helperText={ messageMessage } />
                        </div>
                    }
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

export default App;
