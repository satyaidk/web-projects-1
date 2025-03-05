'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/20/solid';

const currencies = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const switchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertCurrency = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency.code}`
      );
      const rate = response.data.rates[toCurrency.code];
      setResult(parseFloat(amount) * rate);
    } catch (error) {
      console.error('Error converting currency:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    convertCurrency();
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
        Currency Converter
      </h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            min="0"
            step="0.01"
            aria-label="Amount to convert"
            placeholder="Enter amount"
          />
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <Listbox value={fromCurrency} onChange={setFromCurrency}>
              <div className="relative">
                <Listbox.Button className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center text-black">
                  <div className="flex items-center gap-2">
                    <span>{fromCurrency.flag}</span>
                    <span>{fromCurrency.code}</span>
                  </div>
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                </Listbox.Button>
                <Listbox.Options as="div" className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {currencies.map((currency) => (
                    <Listbox.Option
                      key={currency.code}
                      value={currency}
                      className={({ active }) =>
                        `${
                          active ? 'bg-blue-100' : ''
                        } cursor-pointer select-none relative py-2 pl-3 pr-9 text-black`
                      }
                    >
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code} - {currency.name}</span>
                      </div>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 z-10 sm:relative sm:left-0 sm:top-0 sm:translate-x-0 sm:translate-y-0 sm:self-center sm:justify-self-center">
            <button
              onClick={switchCurrencies}
              className="p-2 mb-3 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition-colors shadow-sm"
              aria-label="Switch currencies"
            >
              <ArrowsRightLeftIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div>
            <label className="mt-10 block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <Listbox value={toCurrency} onChange={setToCurrency}>
              <div className="relative">
                <Listbox.Button className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center text-black">
                  <div className="flex items-center gap-2">
                    <span>{toCurrency.flag}</span>
                    <span>{toCurrency.code}</span>
                  </div>
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                </Listbox.Button>
                <Listbox.Options as="div" className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {currencies.map((currency) => (
                    <Listbox.Option
                      key={currency.code}
                      value={currency}
                      className={({ active }) =>
                        `${
                          active ? 'bg-blue-100' : ''
                        } cursor-pointer select-none relative py-2 pl-3 pr-9 text-black`
                      }
                    >
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code} - {currency.name}</span>
                      </div>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : (
          result !== null && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Result:</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">
                {result.toFixed(2)} {toCurrency.code}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
} 