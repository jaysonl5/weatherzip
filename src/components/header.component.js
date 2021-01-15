import React from 'react';
import {
    Col,
    Row,
    Navbar,
  } from "react-bootstrap";

export default function Header(){
    return (
      <div className="row">
          <div className="col-1-of-3"></div>
          <div className="col-1-of-3">
                <img src="../img/logo.png" width="100%" alt="WeatherZip" />
          </div>
          <div className="col-1-of-3"></div>
      </div>
    );
}