
const express = require('express');
const fetch = require('node-fetch');


const app = express();
const PORT = process.env.PORT || 3000;


app.get('/combined-data', async (req, res) => {
  try {
    const month = req.query.month;

    const transactionsResponse = await fetch(`http://localhost:3000/transactions?month=${month}`);
    const transactionsData = await transactionsResponse.json();

    const statisticsResponse = await fetch(`http://localhost:3000/statistics?month=${month}`);
    const statisticsData = await statisticsResponse.json();

    const barChartResponse = await fetch(`http://localhost:3000/bar-chart?month=${month}`);
    const barChartData = await barChartResponse.json();

    
    const combinedData = {
      transactions: transactionsData,
      statistics: statisticsData,
      barChart: barChartData
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
