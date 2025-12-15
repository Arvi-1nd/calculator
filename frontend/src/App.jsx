import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [num1, setNum1] = useState(" ");
  const [num2, setNum2] = useState(" ");
  const [result, setResult] = useState(" ");
  const [error, setError] = useState(" ");

  const handleCalculate = async (operation) => {
    if (!num1 || !num2) {
      setError("Please enter Both numbers!");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/calculate/",
        { operation, num1: parseFloat(num1), num2: parseFloat(num2) }
      );
      setResult(`Result: ${response.data.result}`);
      setError(" ");
    } catch (err) {
      console.error("API Error Details:", err);
      setResult(" ");
      setError(err.response?.data?.error || "Calculation failed !");
    }
  };

  return (
    <div className="App">
      <h1>Calculator App</h1>
      <div className="calculator">
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="First number"
        />
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Second number"
        />
        <div className="buttons">
          <button onClick={() => handleCalculate("add")}>+</button>
          <button onClick={() => handleCalculate("subtract")}>-</button>
          <button onClick={() => handleCalculate("multiply")}>*</button>
          <button onClick={() => handleCalculate("divide")}>/</button>
        </div>
        {result && <p className="result">{result}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default App;
