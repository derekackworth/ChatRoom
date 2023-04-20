import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Message from "@material-ui/icons/Message";
import theme from "./theme";
import "./app.css";

class Logo extends React.PureComponent
{
  render()
  {
    return (
      <MuiThemeProvider theme={ theme }>
        <Message color={ this.props.color } style={{ height: this.props.size, width: this.props.size }}/>
      </MuiThemeProvider>
    );
  }
}

export default Logo;
