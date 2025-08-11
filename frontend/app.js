const API_URL = "/.netlify/functions/server";

async function fetchRates() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();

        document.getElementById("usd-buy").textContent = data.usd.buy.toFixed(2);
        document.getElementById("usd-sell").textContent = data.usd.sell.toFixed(2);
        document.getElementById("eur-buy").textContent = data.eur.buy.toFixed(2);
        document.getElementById("eur-sell").textContent = data.eur.sell.toFixed(2);
    } catch (err) {
        console.error("Помилка отримання даних:", err);
        alert("Не вдалося отримати курси валют");
    }
}

document.getElementById("refresh-btn").addEventListener("click", fetchRates);
fetchRates();
