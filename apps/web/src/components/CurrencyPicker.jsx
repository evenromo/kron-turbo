import { Listbox } from "@headlessui/react";
import { useEffect } from "react";
import { useState } from "react";

export const CurrencyPicker = ({
  currencies,
  handleChange,
  text,
  chosenCurrency,
}) => {
  console.log("currencies", currencies);
  const [selectedCurrency, setSelectedCurrency] = useState("");

  useEffect(() => {
    handleChange(selectedCurrency);
  }, [selectedCurrency]);

  useEffect(() => {
    setSelectedCurrency(chosenCurrency);
  }, [chosenCurrency]);

  return (
    <Listbox
      className="absolute w-full px-4 py-2 overflow-scroll rounded-md shadow-md bg-slate-400 max-h-56"
      value={selectedCurrency.currency}
      onChange={setSelectedCurrency}
      as={"div"}
    >
      <Listbox.Button className="w-full">
        {selectedCurrency ? selectedCurrency : text}
      </Listbox.Button>
      <Listbox.Options className="relative z-50">
        {currencies.map((currency) => {
          if (currency.value === "N/A") {
            return null;
          } else if (currency.currency === "Date") {
            return null;
          }

          return (
            <Listbox.Option key={currency.currency} value={currency.currency}>
              {({ active }) => (
                <span
                  className={`${
                    active ? "bg-gray-100" : ""
                  } block px-4 py-2 text-sm text-gray-700`}
                >
                  {currency.currency}
                </span>
              )}
            </Listbox.Option>
          );
        })}
      </Listbox.Options>
    </Listbox>
  );
};
