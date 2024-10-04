import { useState, useEffect } from "react";

function StockData(props) {
  const [currentPrices, setCurrentPrices] = useState({});
  

  useEffect(() => {
    fetch(
      "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
        props.uppercaseStockSymbol +
        "&apikey=demo"
    )
      .then((res) => res.json())
      .then((data) => {
        const stockQuote = data["Global Quote"];
        if (stockQuote) {
          const price = stockQuote["05. price"];
          setCurrentPrices((prev) => ({
            ...prev,
            [props.uppercaseStockSymbol]: price,
          }));
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [props.uppercaseStockSymbol]);

  const stockEntries = props.stockDataEntries.map((entry, index) => {
    const currentPrice = currentPrices[entry.stockSymbol] || 0;
    const profitLoss = entry.quantity * (currentPrice - entry.purchasePrice);

    const profitLossClass =
      profitLoss > 0 ? "profit" : profitLoss < 0 ? "loss" : "neutral";

    return (
      <div key={index} id="stock-entries">
        <p>
          <strong>Symbol: {entry.stockSymbol}</strong>
        </p>
        <p>Quantity: {entry.quantity}</p>
        <p>Purchase Price: {entry.purchasePrice}</p>
        <p>Current Price: {currentPrice}</p>
        <p className={profitLossClass}>Profit/Loss: {profitLoss.toFixed(2)}</p>
      </div>
    );
  });

  return (
    <div className="stock-list">
      <h2>Stock List</h2>
      <div>{stockEntries}</div>
    </div>
  );
}

export default StockData;
