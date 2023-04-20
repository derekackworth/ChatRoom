import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import Accessibility from "@material-ui/icons/Accessibility";

const TopBar = props =>
{
  const handleOpenChangeRoomDialog = () => props.handleOpenChangeRoomDialog();
  const handleLogout = () => props.handleLogout();
  const handleOpenWhosOnlineDialog = () => props.handleOpenWhosOnlineDialog();
  return (
    <AppBar position="static">
      <Toolbar color="primary">
        <Typography variant="h6" color="inherit">
          Chat Room
        </Typography>
        <div style={{ marginLeft: "auto" }}>
          {
            props.isLoggedIn &&
            <span>
              <Button  onClick={ handleOpenChangeRoomDialog } color="inherit">
                {props.roomName}
              </Button>
              <Button  onClick={ handleLogout } color="inherit">
                Logout
              </Button>
            </span>
          }
          <IconButton onClick={ handleOpenWhosOnlineDialog }>
            <Accessibility style={{ color: "white", height: 50, width: 50 }}/>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
