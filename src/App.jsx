import { useReducer } from "react";
import "./App.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OprationButton";
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATIONS: "choose-operations",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.override)
        return {
          currentOperand: payload.digit,
        };
      if (payload.digit === 0 && state.currentOperand === 0) return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATIONS:
      if (state.currentOperand == null && state.previousOperand == null)
        return {
          state,
        };
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          currentOperand: null,
          previousOperand: state.currentOperand,
        };
      }
      if (state.currentOperand == null) {
        return { ...state, operation: payload.operation };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      )
        return state;
      return {
        ...state,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
        override: false,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.currentOperand == null) return { state };
      if (state.currentOperand.length === 1)
        return {
          ...state,
          currentOperand: null,
        };
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    default:
      return {
        state,
      };
  }
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `INTEGER_FORMATTER.format(integer).${decimal}`;
}

function evaluate({ currentOperand, previousOperand, operation }) {
  let prev = parseFloat(previousOperand);
  let curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return "";
  let answer = "";
  switch (operation) {
    case "+":
      answer = prev + curr;
      break;
    case "-":
      answer = prev - curr;
      break;
    case "*":
      answer = prev * curr;
      break;
    case "÷":
      answer = prev / curr;
      break;
  }
  return answer.toString();
}
function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}{" "}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>

      <OperationButton operation={"÷"} dispatch={dispatch} />
      <OperationButton operation={"*"} dispatch={dispatch} />
      <DigitButton digit={7} dispatch={dispatch} />
      <DigitButton digit={8} dispatch={dispatch} />
      <DigitButton digit={9} dispatch={dispatch} />
      <OperationButton operation={"-"} dispatch={dispatch} />
      <DigitButton digit={4} dispatch={dispatch} />
      <DigitButton digit={5} dispatch={dispatch} />
      <DigitButton digit={6} dispatch={dispatch} />
      <OperationButton operation={"+"} dispatch={dispatch} />

      <DigitButton digit={1} dispatch={dispatch} />
      <DigitButton digit={2} dispatch={dispatch} />
      <DigitButton digit={3} dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
      <DigitButton digit={0} className={"span-two-col"} dispatch={dispatch} />
      <DigitButton digit={"."} dispatch={dispatch} />
    </div>
  );
}

export default App;
