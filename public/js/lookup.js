async function searchStock() {

  const query = document.getElementById('searchInput').value;

  const response = await fetch(`/api/search?q=${query}`);

  const data = await response.json();

  const results = document.getElementById('results');

  results.innerHTML = '';

  data.data.forEach(stock => {

    results.innerHTML += `
      <div class="card">
        <h3>${stock.symbol}</h3>
        <p>${stock.name}</p>

        <button onclick="addToWatchlist(
          '${stock.symbol}',
          '${stock.name}'
        )">
          Add
        </button>

      </div>
    `;

  });

}

async function addToWatchlist(symbol, company) {

  await fetch('/api/watchlist', {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      symbol,
      company
    })

  });

  alert('Added to watchlist');

}