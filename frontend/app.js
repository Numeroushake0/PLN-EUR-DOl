const API_URL = "/.netlify/functions/getRates"; // при деплої на Netlify треба замінити на свій backend

async function fetchRates() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        document.getElementById("usd-buy").textContent = data.usd.buy.toFixed(2);
        document.getElementById("usd-sell").textContent = data.usd.sell.toFixed(2);
        document.getElementById("eur-buy").textContent = data.eur.buy.toFixed(2);
        document.getElementById("eur-sell").textContent = data.eur.sell.toFixed(2);
    } catch (err) {
        alert("Не вдалося отримати курси валют");
    }
}

document.getElementById("refresh-btn").addEventListener("click", fetchRates);

// Завантаження при старті
fetchRates();
