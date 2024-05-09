import React from 'react';
import "./style.css";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div>
        <header className="main_header">
        <p className="calculator_title">About Us</p>
        <div className="flex_container"> 
            <button className="header_buttons">
              <Link to="/">Home</Link>
            </button>
            <button className="header_buttons">
              <Link to="/implied">Implied</Link>
            </button>
            <button className="header_buttons">
              <Link to="/prob">NoVig</Link>
            </button>
            <button className="header_buttons">
              <Link to="/kelly">Kelly</Link>
            </button>
            <button className="header_buttons">
              <Link to="/login">Admin Control</Link>
            </button>
        </div>
      </header>
      <div className="flex_center">
      <div className="calc_holder">
        <h1>About Us</h1>
        <p>Welcome to the Line Leak Website</p>
        <h4>Josh Scheitler <br/></h4>
        <p>I am a second year software engineering student<br/> My favorite bet to place is on womens tennis</p>
        <h4>Jason Bakke <br/></h4>
        <p>I'm a sophomore in software engineering.<br/> My favorite bet is the under for Iowa Football.</p>
      </div>
      </div>
      <footer class="main_footer"> <button className="header_buttons"><Link to="/aboutUs">About Us</Link></button></footer>
    </div>
  );
}

export default AboutUs;
