import React from "react";
import PropTypes from "prop-types";

export class RGBCycle extends React.Component {
  constructor() {
    super();
    this.state = {
      red: 0,
      blue: 0,
      green: 0,
      nextZero: 0,
      isFlushing: false
    };
    this.rgbUpdate = null;
    this.doUpdate = this.doUpdate.bind(this);
  }

  componentDidMount() {
    this.doUpdate();
  }

  doUpdate() {
    this.rgbUpdate = setTimeout(() => {
      // Let this function exist as proof that programming hardware with react
      // late at night is not a great idea
      this.setState(
        state => {
          const nextReset = Object.keys(state)[state.nextZero];

          if (state.isFlushing) {
            if (state[nextReset] >= 1) {
              return { [nextReset]: state[nextReset] - 4 };
            }

            if (state.red === 0 && state.green === 0 && state.blue === 0) {
              return { isFlushing: false };
            }

            return {
              [nextReset]: 0,
              nextZero: (state.nextZero + 1) % 3
            };
          }

          if (state.red < this.props.maxIntensity) {
            return { red: state.red + 2 };
          }
          if (state.blue < this.props.maxIntensity) {
            return { blue: state.blue + 2 };
          }
          if (state.green < this.props.maxIntensity) {
            return { green: state.green + 2 };
          }

          return {
            isFlushing: true,
            nextZero: Math.floor(Math.random() * Math.floor(3))
          };
        },
        () => {
          console.log(this.state);
          this.doUpdate();
        }
      );
    }, this.props.colorTimeout);
  }

  render() {
    return (
      <>
        <pin pin={this.props.redPin} value={this.state.red} mode="PWM" />
        <pin pin={this.props.bluePin} value={this.state.blue} mode="PWM" />
        <pin pin={this.props.greenPin} value={this.state.green} mode="PWM" />
      </>
    );
  }

  componentWillUnmount() {
    cancelInterval(this.rgbUpdate);
    cancelInterval(this.flashUpdate);
  }
}

RGBCycle.propTypes = {
  maxIntensity: PropTypes.number.isRequired,
  colorTimeout: PropTypes.number,
  redPin: PropTypes.number.isRequired,
  bluePin: PropTypes.number.isRequired,
  greenPin: PropTypes.number.isRequired
};
