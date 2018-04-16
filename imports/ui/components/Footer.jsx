import React, {Component} from "react";
import { Icon } from 'semantic-ui-react'

var style = {
  backgroundColor: "#ee6e73",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%",
  color: "white"
}

var phantom = {
display: 'block',
padding: '20px',
height: '60px',
width: '100%',
}

function Footer() {
  return (
      <div>
          <div style={phantom} />
          <div style={style}>
          © Made with <Icon name="like" className="noneBg"/> by Juan Sebastian Prieto & Critian Novoa 
          </div>
      </div>
  )
}

export default Footer