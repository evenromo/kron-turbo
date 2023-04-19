import { useState, useEffect, useRef } from "react";
import { CurrencyPicker } from "./CurrencyPicker";
import { ConversionsHistoryPicker } from "./ConversionHistoryPicker";
import { formatCurrency } from "../utils/formatCurrency";

export const Converter = ({ currencies }) => {
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedCurrency2, setSelectedCurrency2] = useState("");
  const amountRef = useRef();

  const convertCurrency = (amount, currency1, currency2) => {
    if (selectedCurrency && selectedCurrency2) {
      const currency1 = currencies.find(
        (currency) => currency.currency === selectedCurrency
      );
      const currency2 = currencies.find(
        (currency) => currency.currency === selectedCurrency2
      );

      const convertedAmount = (amount * currency1.value) / currency2.value;

      setConvertedAmount(convertedAmount);
      saveConversionToLocalstorage(
        amount,
        convertedAmount,
        selectedCurrency,
        selectedCurrency2
      );
    }
  };

  const saveConversionToLocalstorage = (
    number1,
    number2,
    currency1,
    currency2
  ) => {
    const conversion = {
      number1,
      number2,
      currency1,
      currency2,
    };
    const conversions = JSON.parse(localStorage.getItem("conversions")) || [];
    conversions.push(conversion);
    localStorage.setItem("conversions", JSON.stringify(conversions));
  };

  const getConversionsFromLocalStorage = () => {
    const conversions = JSON.parse(localStorage.getItem("conversions")) || [];
    return conversions;
  };

  const selectAndFillConversion = (conversion) => {
    setAmount(conversion.number1);
    setConvertedAmount(conversion.number2);
    setSelectedCurrency(conversion.currency1);
    setSelectedCurrency2(conversion.currency2);
  };

  return (
    <>
      <div className="flex flex-wrap col-span-8 col-start-3 p-4 mt-6 rounded-md shadow justify-evenly gap-x-4 bg-slate-300 gap-y-4">
        <div className="w-10/12 max-h-20">
          <label htmlFor="amount" className="text-slate-400">
            Amount
          </label>
          <input
            ref={amountRef}
            id="amount"
            className="w-full px-4 py-2 rounded-md shadow-md appearance-none bg-slate-400"
            type="text"
            value={amount}
            placeholder="Amount"
            onChange={() =>
              setAmount(amountRef.current.value.replace(/\D/, ""))
            }
          />
        </div>
        <div className="relative w-4/12 h-16 -ml-5">
          <label htmlFor="amount" className="text-slate-400">
            From
          </label>
          <CurrencyPicker
            currencies={currencies}
            handleChange={setSelectedCurrency}
            chosenCurrency={selectedCurrency}
            text="From"
          />
        </div>
        <div className="relative w-4/12 h-16 -mr-5">
          <label htmlFor="amount" className="text-slate-400">
            To
          </label>
          <CurrencyPicker
            currencies={currencies}
            handleChange={setSelectedCurrency2}
            chosenCurrency={selectedCurrency2}
            text="To"
          />
        </div>
        <div className="w-10/12">
          <button
            className="w-full px-4 py-2 rounded-md shadow-md bg-slate-400"
            onClick={() =>
              convertCurrency(amount, selectedCurrency, selectedCurrency2)
            }
          >
            Convert
          </button>
        </div>
        {selectedCurrency && selectedCurrency2 && convertedAmount && (
          <div className="col-span-10 col-start-2 px-4 py-2 rounded-md shadow-md bg-slate-200">
            <p>
              {amount} {selectedCurrency} ={" "}
              {formatCurrency(convertedAmount, selectedCurrency2)}{" "}
              {selectedCurrency2}
            </p>
          </div>
        )}
      </div>
      <ConversionsHistoryPicker
        previousConversions={getConversionsFromLocalStorage()}
        pickConversion={selectAndFillConversion}
      />
    </>
  );
};
