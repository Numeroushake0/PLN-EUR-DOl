import fetch from "node-fetch";

export async function handler() {
    try {
        const usdRes = await fetch("https://api.nbp.pl/api/exchangerates/rates/c/usd/?format=json");
        const eurRes = await fetch("https://api.nbp.pl/api/exchangerates/rates/c/eur/?format=json");

        const usdData = await usdRes.json();
        const eurData = await eurRes.json();

        return {
            statusCode: 200,
            body: JSON.stringify({
                usd: { buy: usdData.rates[0].bid, sell: usdData.rates[0].ask },
                eur: { buy: eurData.rates[0].bid, sell: eurData.rates[0].ask }
            })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Не вдалося отримати курси валют" })
        };
    }
}
