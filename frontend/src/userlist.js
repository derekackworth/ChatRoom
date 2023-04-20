import React from "react";
import { List } from "@material-ui/core";
import User from "./user";

const UserList = props =>
{
  let users = props.users.reduce((result, user, index) =>
  {
    if (user.chatName !== props.chatName)
    {
      result.push(<User key={ index } user={ user } />);
    }

    return result;
  }, []);
  
  return <List>{ users }</List>;
};

export default UserList;
