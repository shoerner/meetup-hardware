import five from "johnny-five";
import React from "react";
import ReactHardware from "react-hardware";
import { Button, Potentiometer } from "react-hardware";
import { MaxMatrix } from "./MaxMatrix";
import { RGBCycle } from "./RGBCycle";

const word = "Hello React!  ";

class App extends React.Component {
	constructor() {
		super();
		this.state = { text: "", arrayLoc: 0, showingToy: 0, colorRotateSpeed: 20 };
		this.revealMatrix = this.revealMatrix.bind(this);
		this.setFrequency = this.setFrequency.bind(this);
		this.lastInterval = null;
	}

	revealMatrix(event) {
		this.lastInterval = setInterval(() => {
			this.setState(state => {
				if (state.arrayLoc > word.length) {
					state.arrayLoc = 0;
				}
				return {
					text: (word[state.arrayLoc] || "").toUpperCase(),
					arrayLoc: state.arrayLoc + 1,
				};
			});
		}, 500);
	}

	setFrequency({ value }) {
		console.log(`Setting frequency to ${value * 0.5}`);
		this.setState({ colorRotateSpeed: value * 0.5 });
	}

	render() {
		return (
			<>
				{/* <Button pin={2} onDown={this.revealMatrix} internalPullup />
        <MaxMatrix
          clockPin={11}
          dataInPin={9}
          strobePin={10}
          displayText={this.state.text}
        /> */}

				<RGBCycle
					maxIntensity={160}
					colorTimeout={this.state.colorRotateSpeed}
					redPin={5}
					greenPin={6}
					bluePin={3}
				/>
				<Potentiometer onChange={this.setFrequency} pin="A1" threshold={30} />
			</>
		);
	}
}

ReactHardware.render(<App />, new five.Board("/dev/ttyACM0"), inst => {
	console.log("Rendered <%s />", App.name);
});
