import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2'; 
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from "react-router-dom";
import './style.css';

Chart.register(ArcElement, Tooltip, Legend);

function ProbCalculator() {
  const [favorite, setFavorite] = useState('');
  const [underdog, setUnderdog] = useState('');
  const [result, setResult] = useState('');
  const [pieData, setPieData] = useState(null); 

  const calculateProb = (favorite, underdog) => {
    let resultFav;
    let resultUnd;
    let favoriteProb;
    let underdogProb;

    favorite = parseFloat(favorite);
    underdog = parseFloat(underdog);

    if (isNaN(favorite) || isNaN(underdog)) {
      setResult('Please enter valid numbers');
      setPieData(null);
    } else if (favorite < -100 && underdog > 100) {
      favoriteProb = (Math.abs(favorite) / (Math.abs(favorite) + 100)) * 100;
      underdogProb = (100 / (underdog + 100)) * 100;

      resultFav = (favoriteProb / (favoriteProb + underdogProb)) * 100;
      resultUnd = (underdogProb / (underdogProb + favoriteProb)) * 100;

      setResult(
        `Favorite = ${resultFav.toFixed(2)}% Underdog = ${resultUnd.toFixed(2)}%`
      );


      setPieData({
        labels: ['Favorite', 'Underdog'],
        datasets: [
          {
            data: [resultFav, resultUnd],
            backgroundColor: ['#FF6384', '#36A2EB'], 
          },
        ],
      });
    } else {
      if (favorite >= -100) {
        setResult('Favorite must be less than -100');
      }
      if (underdog <= 100) {
        setResult('Underdog must be greater than 100');
      }
      setPieData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    calculateProb(favorite, underdog);
  };

  return (
    <div>
      <header className="main_header">
        <p className="calculator_title">No Vig Calculator</p>
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
          <form onSubmit={handleSubmit}>
            <label>
              Favorite:
              <input
                type="text"
                value={favorite}
                onChange={(e) => setFavorite(e.target.value)}
              />
            </label>
            <label>
              Underdog:
              <input
                type="text"
                value={underdog}
                onChange={(e) => setUnderdog(e.target.value)}
              />
            </label>
            <button type="submit">Calculate</button>
          </form>
          
        
          <div id="result">{result}</div>

          {pieData && (
            <div style={{ width: '200px', height: '200px' }}> 
              <Pie data={pieData} />
            </div>
          )}
        </div>
      </div>

      <footer className="main_footer">
        <button className="header_buttons"><Link to="/aboutUs">About Us</Link></button>
      </footer>
    </div>
  );
}

export default ProbCalculator;
