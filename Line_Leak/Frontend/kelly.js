import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import './style.css'; 


Chart.register(ArcElement, Tooltip, Legend);

function BetCalculator() {
  const [odds, setOdds] = useState('');
  const [chances, setChances] = useState('');
  const [balance, setBalance] = useState('');
  const [result, setResult] = useState('');
  const [pieData, setPieData] = useState(null); 

  const calculateProb = (odds, chances, balance) => {
    odds = parseFloat(odds);
    chances = parseFloat(chances);
    balance = parseFloat(balance);

    if (balance < 0) {
      setResult('Balance must be greater than 0');
      setPieData(null); 
    } else if (chances < 0 || chances > 100) {
      setResult('Chances of Winning must be between 0 and 100');
      setPieData(null);
    } else {
      let calculatedResult;

      if (odds <= -100) {
        odds = Math.abs(odds) - 1;
        chances /= 100;
        calculatedResult = ((odds * chances) - (1 - chances)) / odds;
      } else if (odds >= 100) {
        odds -= 1;
        chances /= 100;
        calculatedResult = ((odds * chances) - (1 - chances)) / odds;
      }

      if (calculatedResult) {
        calculatedResult *= 100;
        const betAmount = balance * (calculatedResult / 100);

        setResult(`You should bet ${calculatedResult.toFixed(1)}% of your account balance, or $${betAmount.toFixed(2)}.`);

     
        setPieData({
          labels: ['Bet', 'Remaining Balance'],
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateProb(odds, chances, balance); 
  };

  return (
    <div>
      <header className="main_header">
        <p className="calculator_title">Kelly Calculator</p>
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
              <input type="text" value={odds} onChange={(e) => setOdds(e.target.value)} />
            </label>
            <label>
              Chances of Winning (%):
              <input type="text" value={chances} onChange={(e) => setChances(e.target.value)} />
            </label>
            <label>
              Account Balance ($):
              <input type="text" value={balance} onChange={(e) => setBalance(e.target.value)} />
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

export default BetCalculator;
