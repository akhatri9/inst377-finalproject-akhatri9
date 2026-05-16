require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const { createClient } = require('@supabase/supabase-js');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const API_KEY = process.env.TWELVE_API_KEY;

app.get('/api/watchlist', async (req, res) => {

  const { data, error } = await supabase
    .from('watchlist')
    .select('*');

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
});

app.post('/api/watchlist', async (req, res) => {

  const { symbol, company } = req.body;

  const { data, error } = await supabase
    .from('watchlist')
    .insert([{ symbol, company }]);

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
});

app.get('/api/quote/:symbol', async (req, res) => {

  try {

    const response = await axios.get(
      `https://api.twelvedata.com/quote?symbol=${req.params.symbol}&apikey=${API_KEY}`
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

app.get('/api/timeseries/:symbol', async (req, res) => {

  try {

    const response = await axios.get(
      `https://api.twelvedata.com/time_series?symbol=${req.params.symbol}&interval=1day&outputsize=30&apikey=${API_KEY}`
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

app.get('/api/search', async (req, res) => {

  try {

    const response = await axios.get(
      `https://api.twelvedata.com/stocks?symbol=${req.query.q}&apikey=${API_KEY}`
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is available on port: ${PORT}`);
});