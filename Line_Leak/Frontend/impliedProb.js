import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2'; // Importing Pie chart component
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import './style.css';
import { Link } from "react-router-dom";


Chart.register(ArcElement, Tooltip, Legend);

function ImpliedProbabilityCalculator() {
  const [odds, setOdds] = useState('');
  const [result, setResult] = useState('');
  const [pieData, setPieData] = useState(null); 

  const calculateImplied = (odds) => {
    odds = parseInt(odds);

    if (isNaN(odds)) {
      setResult('Please enter a valid number');
      setPieData(null);
    } else if (odds <= -100) {
      odds = Math.abs(odds);
      const calculatedResult = (odds / (odds + 100)) * 100;
      setResult(`Actual Probability: ${calculatedResult.toFixed(1)}%`);

      
      setPieData({
        labels: ['Chance of Winning', 'Chance of Losing'],
        datasets: [
          {
            data: [calculatedResult, 100 - calculatedResult],
            backgroundColor: ['#FF6384', '#36A2EB'], 
          },
        ],
      });
    } else if (odds >= 100) {
      const calculatedResult = (100 / (odds + 100)) * 100;
      setResult(`Actual Probability: ${calculatedResult.toFixed(1)}%`);

      
      setPieData({
        labels: ['Implied Probability', 'Remaining'],
        datasets: [
          {
            data: [calculatedResult, 100 - calculatedResult],
            backgroundColor: ['#FF6384', '#36A2EB'], 
          },
        ],
      });
    } else {
      setResult('Odds must be less than -100 or greater than 100');
      setPieData(null);
    }
  };

  const handleInputChange = (e) => {
    setOdds(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); /* Prevent default form submission */
    calculateImplied(odds);
  };

  return (
    <div>
      <header className="main_header">
        <p className="calculator_title">Implied Probability Calculator</p>
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
              Odds:
              <input type="text" value={odds} onChange={handleInputChange} />
            </label>
            <button type="submit">Calculate</button>
          </form>
          
          <div id="result">{result}</div>

          {pieData && <Pie data={pieData} />} 
        </div>
      </div>
      <footer className="main_footer">
        <button className="header_buttons"><Link to="/aboutUs">About Us</Link></button>
      </footer>
    </div>
  );
}

export default ImpliedProbabilityCalculator;
