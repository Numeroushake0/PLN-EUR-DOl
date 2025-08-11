const buyRateEl = document.getElementById('buy-rate');
const sellRateEl = document.getElementById('sell-rate');
const refreshBtn = document.getElementById('refresh');

async function loadRates() {
  try {
    const res = await fetch('ttp://api.nbp.pl/api/exchangerates/tables/A');  // URL до твого JSON з курсами
    const data = await res.json();

    buyRateEl.textContent = data.buy;
    sellRateEl.textContent = data.sell;
  } catch (error) {
    buyRateEl.textContent = 'Помилка завантаження';
    sellRateEl.textContent = 'Помилка завантаження';
    console.error(error);
  }
}

refreshBtn.addEventListener('click', loadRates);

// Завантажити курси при відкритті сторінки
loadRates();
