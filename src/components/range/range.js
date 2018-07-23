import React, { Component } from "react";
import PropTypes from "prop-types";
import colorHandler from "../colorHandler";

class Range extends Component {
  constructor(props) {
    super(props);

    this.colorHandler = new colorHandler(props.color);
    console.log(this.colorHandler);
    this.state = { currentPercent: 0 };
  }

  updatePercent(val) {
    this.setState(prevState => (prevState.currentPercent = val));
  }

  render() {
    let color = this.colorHandler.getColor(this.state.currentPercent * 100);

    return (
      <div
        className="range_item"
        style={{
          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
          float: "left",
          height: `8px`,
          width: "100%"
        }}
        onClick={this.props.onClick}
      />
    );
  }
}

Range.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func
};

export default Range;
