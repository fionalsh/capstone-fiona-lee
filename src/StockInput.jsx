import { useEffect, useState } from "react";
import "./StockStyling.css";
import StockData from "./StockData.jsx";

export function StockInput() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [uppercaseStockSymbol, setUppercaseStockSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [stockDataEntries, setStockDataEntries] = useState([]);

  function handleStockSymbolChange(event) {
    setStockSymbol(event.target.value);
  }

  function handleQuantityChange(event) {
    setQuantity(event.target.value);
  }

  function handlePurchasePriceChange(event) {
    setPurchasePrice(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newUppercaseStockSymbol = stockSymbol.toUpperCase();

    fetch(
      "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
        newUppercaseStockSymbol +
        "&apikey=demo"
    )
      .then((res) => res.json())
      .then((data) => {
        const stockQuote = data["Global Quote"];

        if (
          stockQuote &&
          stockQuote["01. symbol"] === newUppercaseStockSymbol
        ) {
          const newEntry = {
            stockSymbol: newUppercaseStockSymbol,
            quantity: parseFloat(quantity),
            purchasePrice: parseFloat(purchasePrice),
          };
          setStockDataEntries((prev) => [...prev, newEntry]);
          setUppercaseStockSymbol(newUppercaseStockSymbol);
        } else {
          console.error("Invalid stock symbol:", newUppercaseStockSymbol);
        }
      })
      .catch((error) => console.error("Error fetching stock data", error));

    setStockSymbol("");
    setQuantity("");
    setPurchasePrice("");
  }

  return (
    <div>
      <h1>Finance Dashboard</h1>
      <form onSubmit={handleSubmit} className="stock-input-container">
        <div>
          <input
            type="text"
            id="input"
            value={stockSymbol}
            required
            placeholder="Stock Symbol"
            onChange={handleStockSymbolChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="input"
            value={quantity}
            required
            min="1"
            placeholder="Quantity"
            onChange={handleQuantityChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="input"
            value={purchasePrice}
            required
            placeholder="Purchase Price"
            onChange={handlePurchasePriceChange}
          />
        </div>
        <button type="submit" id="submitButton">
          Add Stock
        </button>
      </form>
      <StockData
        stockSymbol={stockSymbol}
        quantity={quantity}
        purchasePrice={purchasePrice}
        stockDataEntries={stockDataEntries}
        uppercaseStockSymbol={uppercaseStockSymbol}
      />
    </div>
  );
}
