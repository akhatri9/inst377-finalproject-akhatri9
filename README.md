# Stock Market Dashboard
### Created by: Anjali Khatri

## Project Description

The Stock Market Dashboard is a full-stack web application that provides users with real-time and historical stock market data. Users can view a watchlist dashboard, search for stock symbols, analyze historical price trends, and retrieve stock metadata.

The system integrates multiple APIs and services:

- **TwelveData API** for real-time and historical stock market data  
- **Supabase** for persistent watchlist storage  
- **Node.js + Express** backend API  

### Key Features
- Watchlist dashboard with live stock pricing
- Stock search and symbol lookup
- Historical stock trend visualization (Chart.js)
- Interactive tables (DataTables)

### Supported Browsers
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

# Developer Manual

This document is intended for future developers who will maintain, extend, or debug the Stock Market Dashboard system.

It assumes general knowledge of:
- Web development (HTML/CSS/JavaScript)
- Node.js + Express
- REST APIs

## Installation Instructions

### 1. Clone Repository
`git clone <repository>`

### 2. Install Dependencies
-`nvm install node`

-`npm install express`

-`npm install nodemon`

-`npm install @supabase/supabase-js`

-`npm install cors` 

-`npm install dotenv` 

-`npm install axios`

### 3. Environment Variables
Create a .env file with environment variables:
*you will need a supabase account and twelve data account to have keys and URLs*
```
TWELVE_API_KEY=your_twelvedata_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

### 4. Running the Application

#### Supabase
- create supabase account
- create new project
- create a table called watchlist with columns id, symbol, company, created_at
- get supabase keys and update .env file

#### TwelveData API
- Create TwelveData Account
- Get API Key and update .env file

#### Local Server

call npm start in command prompt or terminal

`npm start`

go to http://localhost:3000/ in web browser

#### Vercel
- create a vercel account
- import github repository
- update .env variables
- deploy

### 5. API Details

*All API routes are defined in index.js*

#### GET /api/watchlist
Returns all stocks in Supabase watchlist
```
[
  {
    "id": 1,
    "symbol": "AAPL",
    "company": "Apple Inc"
  }
]
```
#### POST /api/watchlist
Adds a stock to the watchlist database.
Request:
```
{
  "symbol": "AAPL",
  "company": "Apple Inc"
}
```
Response
```
{
  "message": "Stock added successfully"
}
```
#### GET /api/quote/:symbol
Returns real-time stock data from TwelveData.
Example
```
/api/quote/TSLA
```
Returns:
- current price
- open, high, low, close
- daily change

#### GET /api/timeseries/:symbol
Returns historical OHLC data for a stock.
Example:
```
/api/timeseries/AAPL
```

#### /api/stocks/search/:query
Searches stock symbols and company names.
Example:
```
/api/stocks/search/apple
```
Returns matching stock metadata.

### 6. Testing
#### Manual Testing Steps:
1. Start server
2. Open browser at localhost:3000
3. Test each page:
    - Dashboard
    - Trends
    - Lookup
    - About
4. Verify API responses in browser:
    - /api/watchlist
    - /api/quote/AAPL
    - /api/timeseries/AAPL

### 7. Roadmap for Future Development

#### Known Issues
- TwelveData API rate limits may delay responses
- Chart.js may briefly flicker when switching symbols
- DataTables may require manual refresh after updates

#### Future Development
- Add financial news alongside each stock
- Allow users to organize stocks into groups