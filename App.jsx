// Imports and Initial Setup
import { useState } from 'react'
import './App.css'
//App Component Definition
function App() {

  //State Initialization
  const [calc, setCalc] = useState({
    display: '0',
    operator: null,
    firstValue: null,
    waitingForSecondValue: false
  })

  //Reset Function 
  const clearCalc = () => {
    setCalc({
      display: '0',
      operator: null,
      firstValue: null,
      waitingForSecondValue: false
    })
  }

  //Add Digit Function
  const addDigit = (digit) => {
    const { display, waitingForSecondValue } = calc

    if (waitingForSecondValue) {
      setCalc({
        ...calc,
        display: String(digit),
        waitingForSecondValue: false
      })
    } else {
      setCalc({
        ...calc,
        display: display === '0' ? String(digit) : display + digit
      })
    }
  }

  //Add Decimal
  const addDecimal = () => {
    const { display, waitingForSecondValue } = calc

    if (waitingForSecondValue) {
      setCalc({
        ...calc,
        display: '0.',
        waitingForSecondValue: false
      })
      return
    }

    if (!display.includes('.')) {
      setCalc({
        ...calc,
        display: display + '.'
      })
    }
  }

  // Handle Operations
  const handleOperation = (nextOperator) => {
    const { display, operator, firstValue, waitingForSecondValue } = calc
    const inputValue = parseFloat(display)

    if (waitingForSecondValue) {
      setCalc({
        ...calc,
        operator: nextOperator
      })
      return
    }

    if (firstValue === null) {
      setCalc({
        ...calc,
        firstValue: inputValue,
        waitingForSecondValue: true,
        operator: nextOperator
      })
    } else if (operator) {
      const result = calculate(firstValue, inputValue, operator)
      
      setCalc({
        ...calc,
        display: String(result),
        firstValue: result,
        waitingForSecondValue: true,
        operator: nextOperator
      })
    }
  }

  //Calculation Function
  const calculate = (firstValue, secondValue, operator) => {
    switch (operator) {
      case '+': return firstValue + secondValue
      case '-': return firstValue - secondValue
      case '×': return firstValue * secondValue
      case '÷': return firstValue / secondValue
      default: return secondValue
    }
  }

  //Equal Button
  const handleEqual = () => {
    const { display, operator, firstValue, waitingForSecondValue } = calc
    
    if (firstValue === null || !operator) return
    
    const inputValue = waitingForSecondValue ? firstValue : parseFloat(display)
    const result = calculate(firstValue, inputValue, operator)
    
    setCalc({
      ...calc,
      display: String(result),
      firstValue: null,
      waitingForSecondValue: false,
      operator: null
    })
  }

  //Plus/Minus Toggle
  const handlePlusMinus = () => {
    const { display } = calc
    const value = parseFloat(display) * -1
    
    setCalc({
      ...calc,
      display: String(value)
    })
  }

  //Percentage Function
  const handlePercent = () => {
    const { display } = calc
    const value = parseFloat(display) / 100
    
    setCalc({
      ...calc,
      display: String(value)
    })
  }

  //Keyboard Support
  const handleKeyDown = (e) => {
    if (/\d/.test(e.key)) {
      e.preventDefault()
      addDigit(parseInt(e.key, 10))
    } else if (e.key === '.') {
      e.preventDefault()
      addDecimal()
    } else if (e.key === '+' || e.key === '-') {
      e.preventDefault()
      handleOperation(e.key)
    } else if (e.key === '*') {
      e.preventDefault()
      handleOperation('×')
    } else if (e.key === '/') {
      e.preventDefault()
      handleOperation('÷')
    } else if (e.key === '=' || e.key === 'Enter') {
      e.preventDefault()
      handleEqual()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      clearCalc()
    }
  }


  //Render Method
  return (
    <div className="calculator-wrapper" tabIndex="0" onKeyDown={handleKeyDown}>
      <div className="calculator-container">
        <div className="display-container">
          <div className="display">{calc.display}</div>
        </div>
        <div className="buttons-container">
          <div className="row">
            <button className="btn function" onClick={clearCalc}>AC</button>
            <button className="btn function" onClick={handlePlusMinus}>+/-</button>
            <button className="btn function" onClick={handlePercent}>%</button>
            <button className="btn operator" onClick={() => handleOperation('÷')}>÷</button>
          </div>
          <div className="row">
            <button className="btn" onClick={() => addDigit(7)}>7</button>
            <button className="btn" onClick={() => addDigit(8)}>8</button>
            <button className="btn" onClick={() => addDigit(9)}>9</button>
            <button className="btn operator" onClick={() => handleOperation('×')}>×</button>
          </div>
          <div className="row">
            <button className="btn" onClick={() => addDigit(4)}>4</button>
            <button className="btn" onClick={() => addDigit(5)}>5</button>
            <button className="btn" onClick={() => addDigit(6)}>6</button>
            <button className="btn operator" onClick={() => handleOperation('-')}>-</button>
          </div>
          <div className="row">
            <button className="btn" onClick={() => addDigit(1)}>1</button>
            <button className="btn" onClick={() => addDigit(2)}>2</button>
            <button className="btn" onClick={() => addDigit(3)}>3</button>
            <button className="btn operator" onClick={() => handleOperation('+')}>+</button>
          </div>
          <div className="row">
            <button className="btn zero" onClick={() => addDigit(0)}>0</button>
            <button className="btn" onClick={addDecimal}>.</button>
            <button className="btn operator" onClick={handleEqual}>=</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
