import React, { useState, useCallback } from "react";
import { formatCurrency } from "../utils/formatCurrency";

export const ConversionsHistoryPicker = ({
  previousConversions,
  pickConversion,
}) => {
  return (
    <div className="flex flex-col col-span-8 col-start-3 p-4 mt-6 rounded-md shadow justify-evenly gap-x-4 bg-slate-300 gap-y-4">
      <h1 className="text-2xl text-center">Conversion History</h1>

      <div className="flex flex-col gap-y-4">
        {previousConversions.map((conversion, i) => {
          return (
            <div
              key={i + conversion.currency2}
              className="flex flex-row justify-between gap-x-4"
            >
              <p>{conversion.number1}</p>
              <p>{conversion.currency1}</p>
              <p>=</p>
              <p>{formatCurrency(conversion.number2, conversion.currency2)}</p>
              <p>{conversion.currency2}</p>
              <button
                onClick={() => pickConversion(conversion)}
                className="p-2 rounded-md bg-slate-400 text-slate-300"
              >
                Pick Conversion
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
