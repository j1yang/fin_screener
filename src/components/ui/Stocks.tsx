import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Stock {
    ticker: string;
    name: string;
}

interface Index {
    name: string;
}

interface Industry {
    name: string;
}

const StocksComponent: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [indexes, setIndexes] = useState<[]>([]);
    const [industries, setIndustries] = useState<[]>([]);
    const BASE_URL = "http://127.0.0.1:8000";
    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/stocks`);
                console.log(response.data)
                setStocks(response.data);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };

        const fetchIndexes = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/stocks/indexes`);
                setIndexes(response.data);
            } catch (error) {
                console.error('Error fetching indexes:', error);
            }
        };

        const fetchIndustries = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/stocks/industries`);
                setIndustries(response.data);
            } catch (error) {
                console.error('Error fetching industries:', error);
            }
        };

        fetchStocks();
        fetchIndexes();
        fetchIndustries();
    }, []);

    return (
        <div>
            <div>
                <label className='text-xl font-normal leading-relaxed text-gray-600 dark:text-gray-300 lg:w-2/3' htmlFor="stocks">Stocks:{' '}</label>
                <select id="stocks">
                    {stocks.map((stock, index) => (
                        <option key={index} value={stock.ticker}>{stock.ticker} | {stock.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className='text-xl font-normal leading-relaxed text-gray-600 dark:text-gray-300 lg:w-2/3' htmlFor="indexes">Indexes:{' '}</label>
                <select id="indexes">
                    {indexes.map((index, i) => (
                        <option key={i} value={index}>{index}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className='text-xl font-normal leading-relaxed text-gray-600 dark:text-gray-300 lg:w-2/3' htmlFor="industries">Industries:{' '}</label>
                <select id="industries">
                    {industries.map((industry, i) => (
                        <option key={i} value={industry}>{industry}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default StocksComponent;
