import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";

const Calculator = () => {
  const [state, setState] = useState({
    display: "0",
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
    history: [],
  });

  const [pressedKey, setPressedKey] = useState("");

  const calculate = useCallback((firstValue, secondValue, operation) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : NaN;
      case "%":
        return firstValue % secondValue;
      default:
        return secondValue;
    }
  }, []);

  const inputNumber = useCallback((num) => {
    setState((prev) => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: num,
          waitingForNewValue: false,
        };
      }

      return {
        ...prev,
        display: prev.display === "0" ? num : prev.display + num,
      };
    });
  }, []);

  const inputDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: "0.",
          waitingForNewValue: false,
        };
      }

      if (prev.display.indexOf(".") === -1) {
        return {
          ...prev,
          display: prev.display + ".",
        };
      }

      return prev;
    });
  }, []);

  const clear = useCallback(() => {
    setState({
      display: "0",
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
      history: [],
    });
  }, []);

  const backspace = useCallback(() => {
    setState((prev) => {
      if (prev.display === "Error" || prev.waitingForNewValue) {
        return {
          ...prev,
          display: "0",
          waitingForNewValue: false,
        };
      }

      const newDisplay =
        prev.display.length > 1 ? prev.display.slice(0, -1) : "0";
      return {
        ...prev,
        display: newDisplay,
      };
    });
  }, []);

  const performOperation = useCallback(
    (nextOperation) => {
      const inputValue = parseFloat(state.display);

      if (state.previousValue === null) {
        setState((prev) => ({
          ...prev,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForNewValue: true,
        }));
      } else if (state.operation) {
        const currentValue = state.previousValue || 0;
        const newValue = calculate(currentValue, inputValue, state.operation);

        if (isNaN(newValue) || !isFinite(newValue)) {
          setState((prev) => ({
            ...prev,
            display: "Error",
            previousValue: null,
            operation: null,
            waitingForNewValue: true,
          }));
          return;
        }

        setState((prev) => ({
          ...prev,
          display: String(newValue),
          previousValue: newValue,
          operation: nextOperation,
          waitingForNewValue: true,
          history: [
            ...prev.history,
            `${currentValue} ${prev.operation} ${inputValue} = ${newValue}`,
          ],
        }));
      }
    },
    [state, calculate]
  );

  const performEquals = useCallback(() => {
    const inputValue = parseFloat(state.display);

    if (state.previousValue !== null && state.operation) {
      const newValue = calculate(
        state.previousValue,
        inputValue,
        state.operation
      );

      if (isNaN(newValue) || !isFinite(newValue)) {
        setState((prev) => ({
          ...prev,
          display: "Error",
          previousValue: null,
          operation: null,
          waitingForNewValue: true,
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        display: String(newValue),
        previousValue: null,
        operation: null,
        waitingForNewValue: true,
        history: [
          ...prev.history,
          `${prev.previousValue} ${prev.operation} ${inputValue} = ${newValue}`,
        ],
      }));
    }
  }, [state, calculate]);

  const handleButtonClick = useCallback(
    (value) => {
      setPressedKey(value);
      setTimeout(() => setPressedKey(""), 150);

      if (value >= "0" && value <= "9") {
        inputNumber(value);
      } else if (value === "00") {
        inputNumber("00");
      } else if (value === ".") {
        inputDecimal();
      } else if (value === "=") {
        performEquals();
      } else if (["+", "-", "×", "÷", "%"].includes(value)) {
        performOperation(value);
      } else if (value === "C") {
        clear();
      } else if (value === "backspace") {
        backspace();
      } else if (value === "±") {
        setState((prev) => ({
          ...prev,
          display: String(-parseFloat(prev.display)),
        }));
      } else if (value === "√") {
        const value = Math.sqrt(parseFloat(state.display));
        setState((prev) => ({
          ...prev,
          display: String(value),
        }));
      }
    },
    [
      inputNumber,
      inputDecimal,
      performEquals,
      performOperation,
      clear,
      backspace,
      state.display,
    ]
  );

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault();
      const key = event.key;

      if (key >= "0" && key <= "9") {
        handleButtonClick(key);
      } else if (key === ".") {
        handleButtonClick(".");
      } else if (key === "+") {
        handleButtonClick("+");
      } else if (key === "-") {
        handleButtonClick("-");
      } else if (key === "*") {
        handleButtonClick("×");
      } else if (key === "/") {
        handleButtonClick("÷");
      } else if (key === "%") {
        handleButtonClick("%");
      } else if (key === "Enter" || key === "=") {
        handleButtonClick("=");
      } else if (key === "Escape") {
        handleButtonClick("C");
      } else if (key === "Backspace") {
        handleButtonClick("backspace");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleButtonClick]);

  const Button = ({ value, onClick, className = "", icon }) => (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden backdrop-blur-md bg-white/10 border border-white/20
        rounded-2xl p-4 text-white font-medium text-lg
        transition-all duration-200 ease-out
        hover:bg-white/20 hover:border-white/30 hover:scale-105 hover:shadow-lg
        active:scale-95 active:bg-white/30
        focus:outline-none focus:ring-2 focus:ring-white/30
        ${pressedKey === value ? "scale-95 bg-white/30 shadow-lg" : ""}
        ${className}
      `}
    >
      <div className="flex items-center justify-center gap-2">{value}</div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-2xl" />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Calculator Body */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
          {/* Display */}
          <div className="mb-6">
            <div className="backdrop-blur-md bg-black/20 border border-white/10 rounded-2xl p-6 mb-4">
              <div className="text-right">
                <div className="text-sm text-white/60 mb-1 h-5">
                  {state.previousValue !== null && state.operation
                    ? `${state.previousValue} ${state.operation}`
                    : ""}
                </div>
                <div className="text-3xl font-light text-white font-mono overflow-hidden">
                  {state.display}
                </div>
              </div>
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <Button
              value="C"
              onClick={() => handleButtonClick("C")}
              className="bg-red-500/20 border-red-300/30 hover:bg-red-500/30"
            />

            <Button
              value="√"
              onClick={() => handleButtonClick("√")}
              className="bg-blue-500/20 border-blue-300/30 hover:bg-blue-500/30"
            />
            <Button
              value="%"
              onClick={() => handleButtonClick("%")}
              className="bg-blue-500/20 border-blue-300/30 hover:bg-blue-500/30"
            />
            <Button
              value="CE"
              onClick={() => handleButtonClick("backspace")}
              className="bg-orange-500/20 border-orange-300/30 hover:bg-orange-500/30"
            />

            {/* Row 2 */}
            <Button value="7" onClick={() => handleButtonClick("7")} />
            <Button value="8" onClick={() => handleButtonClick("8")} />
            <Button value="9" onClick={() => handleButtonClick("9")} />
            <Button
              value="÷"
              onClick={() => handleButtonClick("÷")}
              className="bg-purple-500/20 border-purple-300/30 hover:bg-purple-500/30"
            />

            {/* Row 3 */}
            <Button value="4" onClick={() => handleButtonClick("4")} />
            <Button value="5" onClick={() => handleButtonClick("5")} />
            <Button value="6" onClick={() => handleButtonClick("6")} />
            <Button
              value="×"
              onClick={() => handleButtonClick("×")}
              className="bg-purple-500/20 border-purple-300/30 hover:bg-purple-500/30"
            />

            {/* Row 4 */}
            <Button value="1" onClick={() => handleButtonClick("1")} />
            <Button value="2" onClick={() => handleButtonClick("2")} />
            <Button value="3" onClick={() => handleButtonClick("3")} />
            <Button
              value="-"
              onClick={() => handleButtonClick("-")}
              className="bg-purple-500/20 border-purple-300/30 hover:bg-purple-500/30"
            />

            {/* Row 5 */}

            <Button value="0" onClick={() => handleButtonClick("0")} />

            <Button
              value="±"
              onClick={() => handleButtonClick("±")}
              className="bg-blue-500/20 border-blue-300/30 hover:bg-blue-500/30"
            />
            <Button value="." onClick={() => handleButtonClick(".")} />
            <Button
              value="+"
              onClick={() => handleButtonClick("+")}
              className="bg-purple-500/20 border-purple-300/30 hover:bg-purple-500/30"
            />

            {/* Row 6 - Equals button spanning full width */}
            <Button
              value="="
              onClick={() => handleButtonClick("=")}
              className="col-span-4 bg-green-500/20 border-green-300/30 hover:bg-green-500/30"
            />
          </div>

          {/* History */}
          {state.history.length > 0 && (
            <div className="mt-6">
              <div className="backdrop-blur-md bg-black/10 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white/80">History</h3>
                  <button
                    onClick={() =>
                      setState((prev) => ({ ...prev, history: [] }))
                    }
                    className="text-white/60 hover:text-white/80 transition-colors"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
                <div className="space-y-1 max-h-24 overflow-y-auto">
                  {state.history.slice(-3).map((entry, index) => (
                    <div
                      key={index}
                      className="text-xs text-white/60 font-mono"
                    >
                      {entry}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Keyboard Hint */}
          <div className="mt-4 text-center">
            <p className="text-xs text-white/40">
              Use keyboard: 0-9, +, -, *, /, Enter, Esc, Backspace
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
