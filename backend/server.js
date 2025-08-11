// Функція для отримання курсу валют з Narodowy Bank Polski API
async function getExchangeRateNBP(table, code) {
  const url = `https://api.nbp.pl/api/exchangerates/rates/${table}/${code}/?format=json`;
  
  try {
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`Помилка запиту: ${response.status}`);
    }
    
    const data = await response.json();
    return data.rates[0].mid; // середній курс
  } catch (error) {
    console.error('Помилка отримання курсу:', error);
    return null;
  }
}

// Приклад використання
(async () => {
  const usdRate = await getExchangeRateNBP('a', 'USD');
  const eurRate = await getExchangeRateNBP('a', 'EUR');
  
  console.log(`Курс USD: ${usdRate}`);
  console.log(`Курс EUR: ${eurRate}`);
})();
