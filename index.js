import five from "johnny-five";
import React from "react";
import ReactHardware from "react-hardware";
import { Button } from "react-hardware";
import { MaxMatrix } from "./MaxMatrix";

const word = "Hello World!  ";

class App extends React.Component {
  constructor() {
    super();
    this.state = { text: "", arrayLoc: 0 };
    this.revealMatrix = this.revealMatrix.bind(this);
  }

  componentDidMount() {}

  revealMatrix(event) {
    setInterval(() => {
      this.setState(state => {
        if (state.arrayLoc > word.length) {
          state.arrayLoc = 0;
        }
        return {
          text: (word[state.arrayLoc] || "").toUpperCase(),
          arrayLoc: state.arrayLoc + 1
        };
      });
    }, 500);
  }
  reportStatus(value) {
    console.log(value);
  }

  render() {
    return (
      <>
        <Button pin={2} onDown={this.revealMatrix} internalPullup/>
        <MaxMatrix
          clockPin={11}
          dataInPin={9}
          strobePin={10}
          displayText={this.state.text}
        />
      </>
    );
  }
}

ReactHardware.render(<App />, new five.Board("/dev/ttyACM0"), inst => {
  console.log("Rendered <%s />", App.name);
});
