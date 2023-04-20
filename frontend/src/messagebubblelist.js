import React from "react";
import { List } from "@material-ui/core";
import MessageBubble from "./messagebubble";

const MessageBubbleList = props =>
{
  let messages = props.messages.map((message, index) =>
  {
    return <MessageBubble key={ index } message={ message } chatName={ props.chatName } />;
  });

  return <List>{ messages }</List>;
};

export default MessageBubbleList;
