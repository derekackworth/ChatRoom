import React from "react";
import "./app.css";

const Bubble = props =>
{
  if (props.alignRight === true)
  {
    return (
      <div className="bubble" style={{ marginLeft: "auto", backgroundColor: props.message.color }}>
        <span style={{fontSize: "smaller" }}>{ props.message.from }:</span>
        <span style={{ fontSize: "smaller", float: "right" }}>{ props.message.time }</span>
        <br />
        <br />
        <span style={{ wordWrap: "break-word", fontWeight: "bold" }}>{ props.message.text }</span>
      </div>
      );
  }
  else
  {
    return (
      <div className="bubble" style={{ marginLeft: 0, backgroundColor: props.message.color }}>
        <span style={{ fontSize: "smaller" }}>{ props.message.from }:</span>
        <span style={{ fontSize: "smaller", float: "right" }}>{ props.message.time }</span>
        <br />
        <br />
        <span style={{ wordWrap: "break-word", fontWeight: "bold" }}>{ props.message.text }</span>
      </div>
    );
  }
};

export default Bubble;
