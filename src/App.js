import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '0',
      previousValue: null,
      operator: null,
      waitingForOperand: false,
    };
  }

  calculate = (x, y, operator) => {
    x = parseFloat(x);
    y = parseFloat(y);

    const { waitingForOperand } = this.state;

    if (waitingForOperand) {
      return y;
    }

    switch (operator) {
      case '+':
        return x + y;
      case '-':
        return x - y;
      case '*':
        return x * y;
      case '/':
        if (y !== 0) {
          return x / y;
        } else {
          alert("Can't divide by zero!");
          return '0';
        }
      default:
        return y;
    }
  };

  inputDigit = (digit) => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit,
      });
    }
  };

  inputDecimal = () => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false,
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
      });
    }
  };

  clearDisplay = () => {
    this.setState({
      displayValue: '0',
      previousValue: null,
      operator: null,
      waitingForOperand: false,
    });
  };

  inputOperator = (nextOperator) => {
    const { displayValue, operator, previousValue } = this.state;

    if (operator && !this.state.waitingForOperand) {
      const result = this.calculate(previousValue, displayValue, operator);
      this.setState({
        displayValue: String(result),
        previousValue: result,
      });
    } else {
      this.setState({
        previousValue: displayValue,
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator,
    });
  };

  handleButtonClick = (value) => {
    if (Number.isInteger(value)) {
      this.inputDigit(value);
    } else if (value === '.') {
      this.inputDecimal();
    } else if (value === 'C') {
      this.clearDisplay();
    } else if (['+', '-', '*', '/'].includes(value)) {
      this.inputOperator(value);
    } else if (value === '=') {
      this.inputOperator(value);
    }
  };

  render() {
    const { displayValue } = this.state;

    return (
      
      <div className="calculator">
        <h1> Konzen's Calculator</h1>
        <div className="display">{displayValue}</div>
        <div className="buttons">
          <button onClick={() => this.handleButtonClick(7)}>7</button>
          <button onClick={() => this.handleButtonClick(8)}>8</button>
          <button onClick={() => this.handleButtonClick(9)}>9</button>
          <button onClick={() => this.handleButtonClick('+')}>+</button>
          <button onClick={() => this.handleButtonClick(4)}>4</button>
          <button onClick={() => this.handleButtonClick(5)}>5</button>
          <button onClick={() => this.handleButtonClick(6)}>6</button>
          <button onClick={() => this.handleButtonClick('-')}>-</button>
          <button onClick={() => this.handleButtonClick(1)}>1</button>
          <button onClick={() => this.handleButtonClick(2)}>2</button>
          <button onClick={() => this.handleButtonClick(3)}>3</button>
          <button onClick={() => this.handleButtonClick('*')}>*</button>
          <button onClick={() => this.handleButtonClick(0)}>0</button>
          <button onClick={() => this.handleButtonClick('.')}>.</button>
          <button onClick={() => this.handleButtonClick('=')}>=</button>
          <button onClick={() => this.handleButtonClick('/')}>/</button>
          <button onClick={() => this.handleButtonClick('C')}>C</button>
        </div>
      </div>
    );
  }
}

export default App;
