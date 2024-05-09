import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import jsonData from './odds_data.json';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './style.css';
import biglogo from "C:/Users/jsche/Documents/319_final/frontend/src/biglogo.png";


const EventTable = ({ event }) => {
  
  const bookmakers = event.bookmakers.map((bookmaker) => bookmaker.title);

 
    
 
  const firstRow = (
    <tr>
      <th class="table_header">Bookmaker</th>
      {bookmakers.map((bookmaker, index) => (
        <th class="table_header" key={index}>{bookmaker}</th>
      ))}
    </tr>
  );

  const secondRow = (
    <tr>
      <td class="table_element">Prices for Home Team</td>
      {event.bookmakers.map((bookmaker, index) => (
        <td class="table_element" key={index}>{bookmaker.markets[0].outcomes[0].price}</td>
      ))}
    </tr>
  );

  const thirdRow = (
    <tr>
      <td class="table_element">Prices for Away Team</td>
      {event.bookmakers.map((bookmaker, index) => (
        <td class="table_element" key={index}>{bookmaker.markets[0].outcomes[1].price}</td>
      ))}
    </tr>
  );

  return (
    <table class="main_table" style={{ width: '100%', textAlign: 'center' }}>
      <thead> 
        {firstRow}
      </thead>
      <tbody>
        {secondRow}
        {thirdRow}
      </tbody>
    </table>
  );
};




const EventTables = ({ data }) => {
  return (
    <div class="table_return">
      {data.map((event, index) => (
        <div class="table_element" key={index} style={{ marginBottom: '20px' }}>
          <h3>{`${event.home_team} vs. ${event.away_team}`}</h3>
          <EventTable event={event} />
        </div>
      ))}
    </div>
  );
};

const Main = () => {
  return (
    <div class="page_container">
   
      <header className="main_header"> 

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
        <img src={biglogo} alt="Big Logo" style={{width: '400px', height: 'auto'}}></img>
      </header>
      <main> 
        <h1 class="main_table_title">Exhibitions Today</h1>
        <EventTables data={jsonData} />
      </main>
      <footer class="main_footer"> <button className="header_buttons"><Link to="/aboutUs">About Us</Link></button></footer>
    </div>
  );
};

export default Main;
