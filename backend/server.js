export async function handler() {
    console.log("📡 Запит на отримання курсів валют...");

    try {
        console.log("➡️ Отримую курс USD...");
        const usdRes = await fetch("https://api.nbp.pl/api/exchangerates/rates/c/usd/?format=json");
        console.log("📥 Статус USD:", usdRes.status);
        const usdData = await usdRes.json();
        console.log("✅ Курс USD отримано:", usdData);

        console.log("➡️ Отримую курс EUR...");
        const eurRes = await fetch("https://api.nbp.pl/api/exchangerates/rates/c/eur/?format=json");
        console.log("📥 Статус EUR:", eurRes.status);
        const eurData = await eurRes.json();
        console.log("✅ Курс EUR отримано:", eurData);

        const result = {
            usd: { buy: usdData.rates[0].bid, sell: usdData.rates[0].ask },
            eur: { buy: eurData.rates[0].bid, sell: eurData.rates[0].ask }
        };

        console.log("📊 Результат для фронтенду:", result);

        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (err) {
        console.error("❌ Помилка отримання курсів:", err);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Не вдалося отримати курси валют",
                details: err.message
            })
        };
    }
}
