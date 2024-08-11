import React, { useState, useEffect } from 'react';

const CurrencyTable = () => {
    const [rates, setRates] = useState({});
    const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP', 'USD'];
    const apiKey = 'c8eb286aef27411dac3513e3e3116b57';

    useEffect(() => {
        const fetchRates = async () => {
            try {
                //const response = await fetch(`https://api.currencyfreaks.com/latest?apikey=${process.env.CURRENCY_API_KEY}`);
                const response = await fetch(`https://api.currencyfreaks.com/latest?apikey=`+ apiKey);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRates(data.rates);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRates();
    }, []);

    return (
        <table className='table table-bordered w-50'>
            <thead>
                <tr>
                    <th>Currency</th>
                    <th>We Buy (USD)</th>
                    <th>Exchange Rate</th>
                    <th>We Sell (USD)</th>
                </tr>
            </thead>
            <tbody>
                {currencies.map((currency) => {
                    if (!rates[currency]) return null;

                    const margin = 0.0002;
                    const rate = rates[currency] / rates['USD'];
                    const exrate = rate;
                    // const weBuy = 1 / rate;  // 1 USD in terms of the currency
                    
                    // margin 0,02%
                    const weSell = rate * (1 + margin);  // Slightly increased for selling
                    const weBuy = rate * (1 - margin);

                    return (
                        <tr key={currency}>
                            <td>{currency}</td>
                            <td>{weBuy.toFixed(4)}</td>
                            <td>{exrate.toFixed(4)}</td>
                            <td>{weSell.toFixed(4)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default CurrencyTable;
