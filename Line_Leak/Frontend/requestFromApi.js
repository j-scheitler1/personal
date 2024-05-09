const axios = require('axios');
const fs = require('fs');
const cron = require('node-cron');

// API key and other parameters
const apiKey = '7f96a2ac2f94b8e0b972fb903af5abc9';
const sportKey = 'baseball_mlb';
const regions = 'us';
const markets = 'h2h';
const oddsFormat = 'american';
const dateFormat = 'iso';

// Path for the output JSON file
const outputPath = 'C:/Users/jsche/Documents/319_final/frontend/src/components/odds_data.json';

// Function to fetch and write odds data
async function fetchAndWriteOdds() {
  try {
    const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
      params: { apiKey, regions, markets, oddsFormat, dateFormat },
    });

    fs.writeFileSync(outputPath, JSON.stringify(response.data, null, 2));
    console.log('Data saved to', outputPath);
  } catch (error) {
    console.error('Error fetching or saving odds:', error.message);
  }
}

// Schedule the job to run every day at 12:00 PM
cron.schedule('0 12 * * *', fetchAndWriteOdds);

console.log('Cron job scheduled to fetch odds data once per day at 12:00 PM.');


