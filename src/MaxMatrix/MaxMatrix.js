import React from "react";
import ReactHardware from "react-hardware";
import five from 'johnny-five';
import PropTypes from 'prop-types';

// const MAX_REGISTER = {
//   DECODE_MODE: 9,
//   INTENSITY: 10,
//   SCAN_LIMIT: 11,
//   SHUTDOWN: 12,
//   DISPLAY_TEST: 15
// };

// const INIT_PARAMS = [
//   [SCAN_LIMIT, 7],
//   [DECODE_MODE, 0],
//   [SHUTDOWN, 1],
//   [DISPLAY_TEST, 0],
//   [INTENSITY, 15]
// ];

export class MaxMatrix extends React.Component {
  constructor() {
    super();
    this.state = {
      value: undefined,
      location: 0,
      pinStates: { clock: 0, dataIn: 0, strobe: 0 }
    };
  }

  componentDidMount() {
    this.node = new five.Led.Matrix({
      pins: {
        data: this.props.dataInPin,
        clock: this.props.clockPin,
        cs: this.props.strobePin
      },
      rotation: 90
    });
    
    this.node.brightness(2);

    if(this.props.displayText) {
      this.renderLetter(this.props.displayText);
    }
  }
  
  componentDidUpdate() {
    if(this.props.displayText) {
      this.renderLetter(this.props.displayText);
    }
  }

  renderLetter(character) {
    this.node.draw(character);
  }

  render() {
    console.log(`Rendering new state: ${this.props.displayText}`);
    return null;
  }

  componentWillUnmount() {
    this.node.off();
  }
}

MaxMatrix.propTypes = {
  clockPin: PropTypes.number.isRequired,
  dataInPin: PropTypes.number.isRequired,
  strobePin: PropTypes.number.isRequired,
  displayText: PropTypes.string,
};

