import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ListItem } from "@material-ui/core";
import AccountBox from "@material-ui/icons/AccountBox";

class User extends React.Component
{
  theme = createMuiTheme(
  {
    typography:
    {
      useNextVariants: true
    },
    palette:
    {
      primary:
      {
        main: this.props.user.color
      }
    }
  });
  render()
  {
    return (
      <MuiThemeProvider theme={ this.theme }>
        <ListItem ref="user" style={{ textAlign: "left", marginBottom: "2px" }}>
          <AccountBox color="primary" style={{ height: "30px", width: "30px", marginRight: "20px" }} />
          { this.props.user.chatName } is in room: { this.props.user.roomName }
        </ListItem>
      </MuiThemeProvider>
    );
  }
}

export default User;
