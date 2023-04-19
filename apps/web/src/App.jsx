import { useState, useEffect } from "react";
import { Converter } from "./components/Converter";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);

  //Fetch data from API
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api", {
      cors: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCurrencies(data);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  }, []);

  const convertJsonToArray = (json) => {
    const array = [];
    for (let key in json) {
      array.push({ currency: key, value: json[key] });
    }
    return array;
  };

  const convertedJson = convertJsonToArray(currencies[0]);

  //Animated Loading state
  if (loading) {
    return (
      <div className="base-grid base-container m-28">
        <div className="col-span-1 col-start-6">
          <div className="w-12 h-12 border-8 border-solid rounded-full border-slate-300 animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className=" base-grid base-container m-28">
      <h1 className="col-span-7 col-start-4 text-2xl text-slate-300">
        Currency converter
      </h1>
      <Converter currencies={convertedJson} />
    </div>
  );
}
