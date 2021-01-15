import React from 'react';
import {Navbar} from "react-bootstrap";

export default function Footer(){
    return (
      <div>
          <Navbar variant="dark" bg="dark" fixed="bottom">
            <Navbar.Brand href="#home">WeatherZip</Navbar.Brand>
          </Navbar>
      </div>
    );
}