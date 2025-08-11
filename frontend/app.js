const buyRateEl = document.getElementById('buy-rate');
const sellRateEl = document.getElementById('sell-rate');
const refreshBtn = document.getElementById('refresh');

async function loadRates() {
  try {
    const res = await fetch('http://localhost:3000/api/rates');
    const data = await res.json();
    buyRateEl.textContent = data.buy;
    sellRateEl.textContent = data.sell;
  } catch (error) {
    buyRateEl.textContent = 'Помилка';
    sellRateEl.textContent = 'Помилка';
    console.error(error);
  }
}

refreshBtn.addEventListener('click', loadRates);
loadRates();
