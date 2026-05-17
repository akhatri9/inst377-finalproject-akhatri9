async function loadWatchlist() {

  try {

    const response = await fetch('/api/watchlist');

    const watchlist = await response.json();

    console.log(watchlist);

    const tbody = document.querySelector('#watchlistTable tbody');

    tbody.innerHTML = '';

    // Empty watchlist message
    if (!watchlist || watchlist.length === 0) {

      tbody.innerHTML = `
        <tr>
          <td colspan="4" class="empty-message">
            No stocks have been added to the watchlist yet.
          </td>
        </tr>
      `;

      return;
    }

    // Load stock quotes
    for (const stock of watchlist) {

      const quoteResponse = await fetch(
        `/api/quote/${stock.symbol}`
      );

      const quote = await quoteResponse.json();

      const row = `
        <tr>
          <td>${quote.symbol}</td>
          <td>${quote.name}</td>
          <td>$${quote.close}</td>
          <td>${quote.percent_change}%</td>
        </tr>
      `;

      tbody.innerHTML += row;
    }

    // Only initialize DataTable if rows exist
    $('#watchlistTable').DataTable();

  } catch (error) {

    console.error('Dashboard Error:', error);

  }

}

loadWatchlist();