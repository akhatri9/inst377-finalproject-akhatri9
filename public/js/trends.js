let chart;

async function loadChart() {

  const symbol = document.getElementById('symbolInput').value;

  const response = await fetch(`/api/timeseries/${symbol}`);

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
        label: symbol,
        data: prices
      }]

    }

  });

}