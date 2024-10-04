import "./App.css";
import { StockInput } from "./StockInput";
import calculatorLogo from "./assets/calculator.svg";

function App() {
  return (
    <>
      <div className="app-container">
        <img src={calculatorLogo} className="logo" alt="calculator logo"/>
        <StockInput />
      </div>
    </>
  );
}

export default App;
