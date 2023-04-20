import React from "react";

const Triangle = props =>
{
  if (props.alignRight === true)
  {
    return (
      <div style=
        {{
          content: "",
          position: "absolute",
          bottom: "-18px",
          right: "50px",
          borderWidth: "10px 0px 0px 10px",
          borderStyle: "solid",
          borderColor: `${props.color} transparent`
        }} />
    );
  }
  else
  {
    return (
      <div style=
        {{
          content: "",
          position: "absolute",
          bottom: "-18px",
          left: "50px",
          borderWidth: "10px 10px 0px 0px",
          borderStyle: "solid",
          borderColor: `${props.color} transparent`
        }} />
    );
  }
};

export default Triangle;
