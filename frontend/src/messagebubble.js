import React from "react";
import ReactDOM from "react-dom";
import { ListItem } from "@material-ui/core";
import Bubble from "./bubble";
import Triangle from "./triangle";

class MessageBubble extends React.Component
{
  state =
  {
    alignRight: false
  };

  componentDidMount = () =>
  {
    if (this.props.message.from === this.props.chatName)
    {
      this.setState({ alignRight: true });
    }

    let messageDOM = ReactDOM.findDOMNode(this);
    messageDOM.scrollIntoView({ block: "end", behavior: "smooth" });
    messageDOM.blur();
  };

  render()
  {
    const { alignRight } = this.state;
    return (
      <div>
        <ListItem ref="message" style={{ textAlign: "left", marginBottom: "5px" }}>
          <Bubble message={ this.props.message } alignRight={ alignRight } />
          <Triangle color={ this.props.message.color } alignRight={ alignRight } />
        </ListItem>
        <br />
      </div>
    );
  }
}

export default MessageBubble;
