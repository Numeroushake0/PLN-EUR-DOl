import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// Функція для отримання курсів з API NBP
async function getRates() {
    const usdRes = await fetch("https://api.nbp.pl/api/exchangerates/rates/c/usd/?format=json");
    const eurRes = await fetch("https://api.nbp.pl/api/exchangerates/rates/c/eur/?format=json");

    const usdData = await usdRes.json();
    const eurData = await eurRes.json();

    return {
        usd: {
            buy: usdData.rates[0].bid,
            sell: usdData.rates[0].ask
        },
        eur: {
            buy: eurData.rates[0].bid,
            sell: eurData.rates[0].ask
        }
    };
}

// API-ендпоінт
app.get("/api/rates", async (req, res) => {
    try {
        const rates = await getRates();
        res.json(rates);
    } catch (err) {
        res.status(500).json({ error: "Не вдалося отримати курси" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend запущено на порті ${PORT}`));
