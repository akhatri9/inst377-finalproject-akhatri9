let chart;

async function loadChart(symbol) {

  try {

    document.getElementById('symbolInput').value = symbol;

    const response = await fetch(
      `/api/timeseries/${symbol}`
    );

    const data = await response.json();
    const values = data.values.reverse();
    const labels = values.map(v => v.datetime);
    const prices = values.map(v => v.close);
    const ctx = document.getElementById('stockChart');

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {

      type: 'line',

      data: {

        labels,

        datasets: [{

          label: `${symbol} Closing Prices`,

          data: prices,

          tension: 0.3,

          fill: true

        }]
      },

      options: {

        responsive: true,

        plugins: {

          legend: {
            labels: {
              color: 'white'
            }
          }
        },

        scales: {

          x: {
            ticks: {
              color: 'white'
            }
          },

          y: {
            ticks: {
              color: 'white'
            }
          }
        }
      }
    });

  } catch (error) {

    console.error(error);

  }
}

function searchChart() {

  const symbol = document
    .getElementById('symbolInput')
    .value;

  loadChart(symbol);
}

// Default chart on page load
loadChart('AAPL');