import React from "react";
import Button from "./components/Button";
import Display from "./components/Display";
import { evaluate } from "mathjs";
import "./App.css";

/* TO DO:
  - Maximum digit handling 
*/

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      result: "",
    };
  }

  clear = () => {
    this.setState({
      input: "",
      result: "",
    });
  };

  // exceededMaxDigit = (prevInput) => {
  //   console.log(this.state.input.length);
  //   this.setState({
  //     input: "Digit limit met",
  //   });
  //   setTimeout(
  //     () =>
  //       this.setState({
  //         input: prevInput,
  //       }),
  //     1000
  //   );
  // };

  addInput = (value) => {
    if (this.state.input !== "0") {
      this.setState((state) => ({
        input: state.input + value,
      }));
    } else {
      this.setState({
        input: value,
      });
    }
  };

  isOperator = (value) => {
    return value === "⋅" ||
      value === "*" ||
      value === "/" ||
      value === "%" ||
      value === "+" ||
      value === "-"
      ? true
      : false;
  };

  endsWithOperator = (expression) => {
    if (this.isOperator(expression[expression.length - 1])) {
      let newExpression = expression.slice(0, -1);
      return newExpression;
    }
    return expression;
  };

  addOperator = (value) => {
    // Use previous result if no user defined input for operation otherwise
    // prevent adding operator if no previous result or input from user
    if (this.state.input === "") {
      if (this.state.result === "") {
        return;
      } else {
        this.useAnswer();
      }
    }

    // Error checking to prevent multiple operators to be used consecutively
    // in an expression i.e. 9+/2
    if (this.isOperator(this.state.input[this.state.input.length - 1])) {
      let newInput = Array.from(this.state.input);
      newInput[newInput.length - 1] = value;
      this.setState({
        input: newInput.join(""),
      });
    } else {
      this.setState((state) => ({
        input: state.input + value,
      }));
    }
  };

  useAnswer = () => {
    if (this.state.result !== "") {
      this.addInput(this.state.result);
    }
  };

  addDecimal = (decimal) => {
    // Each term can only contain one decimal point
    let terms = this.state.input.split(/\+|-|\/|⋅/);
    if (terms[terms.length - 1].indexOf(".") === -1) {
      // If the term is empty, add a leading "0"
      if (terms[terms.length - 1] === "") {
        this.addInput("0.");
      } else {
        this.addInput(decimal);
      }
    }
  };

  addZero = (value) => {
    // Prevent leading zeros in integers i.e. "00312"
    if (this.state.input !== "") {
      this.addInput(value);
    }
  };

  limitDecimalsPlace = (result) => {
    let [integer, decimal] = result;
    if (decimal !== undefined) {
      if (decimal.length > 7) {
        decimal = decimal.slice(0, 7);
      }
      return `${integer}.${decimal}`;
    }
    return integer;
  };

  calculate = (expression) => {
    if (expression === "") return;

    // mathjs multiplication requires "*", remove trailing operators, and
    // limit decimals place to a maximum of 7
    let formattedExpression = expression.replaceAll("⋅", "*");
    formattedExpression = this.endsWithOperator(formattedExpression);
    let resultArr = evaluate(formattedExpression).toString().split(".");
    let result = this.limitDecimalsPlace(resultArr);

    this.setState({
      input: "",
      result: result,
    });
  };

  handleClick = (value) => {
    switch (value) {
      case "CE":
        this.clear();
        break;
      case "+":
      case "-":
      case "%":
      case "/":
        this.addOperator(value);
        break;
      case "x":
        this.addOperator("⋅");
        break;
      case ".":
        this.addDecimal(value);
        break;
      case "0":
        this.addZero(value);
        break;
      case "=":
        this.calculate(this.state.input);
        break;
      default:
        this.addInput(value);
        break;
    }
  };

  render() {
    const { input, result } = this.state;
    return (
      <div className="App">
        <div className="App-wrapper">
          <div className="display-wrapper">
            <Display input={input} result={result} />
          </div>
          <div className="btn-wrapper">
            <div className="row">
              <Button type="clear" handleClick={this.handleClick}>
                CE
              </Button>
              <Button type="operator" handleClick={this.handleClick}>
                %
              </Button>
              <Button type="operator" handleClick={this.handleClick}>
                /
              </Button>
            </div>
            <div className="row">
              <Button type="digit" handleClick={this.handleClick}>
                7
              </Button>
              <Button type="digit" handleClick={this.handleClick}>
                8
              </Button>
              <Button type="digit" handleClick={this.handleClick}>
                9
              </Button>
              <Button type="operator" handleClick={this.handleClick}>
                x
              </Button>
            </div>
            <div className="row">
              <Button type="digit" handleClick={this.handleClick}>
                4
              </Button>
              <Button type="digit" handleClick={this.handleClick}>
                5
              </Button>
              <Button type="digit" handleClick={this.handleClick}>
                6
              </Button>
              <Button type="operator" handleClick={this.handleClick}>
                -
              </Button>
            </div>
            <div className="row">
              <Button type="digit" handleClick={this.handleClick}>
                1
              </Button>
              <Button type="digit" handleClick={this.handleClick}>
                2
              </Button>
              <Button type="digit" handleClick={this.handleClick}>
                3
              </Button>
              <Button type="operator" handleClick={this.handleClick}>
                +
              </Button>
            </div>
            <div className="row">
              <Button type="zero" handleClick={this.handleClick}>
                0
              </Button>
              <Button type="decimal" handleClick={this.handleClick}>
                .
              </Button>
              <Button type="equals" handleClick={this.handleClick}>
                =
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
