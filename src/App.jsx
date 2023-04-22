import "./App.css"
function App() {
  return(
  <div className="calculator-grid">
    <div className="output">
      <div className="previous-operand">12,145,55 +</div>
      <div className="current-operand">54,545</div>
    </div>
    <button>AC</button>
    <button>DEL</button>
    <button>÷</button>
    <button>*</button>
    
    <button>7</button>
    <button>8</button>
    <button>9</button>
    <button>-</button>
    
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>+</button>
    <button>1</button>
    <button>2</button>
    <button>3</button>
    <button className="span-two">=</button>
    <button className="span-two-col">0</button>
    <button>.</button>
  </div>
  )
}

export default App
