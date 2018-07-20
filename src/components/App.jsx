import React, { Component } from 'react';
import Slider from './slider/Slider'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {currentValue : 0};
  }

  updateValue(sender, args) {
    this.setState({currentValue : `${Math.ceil(args.currentValue)} (${Math.ceil(args.currentPercent)})`});
  }

  render() {
    return (
      <div className="App" style={{width:'40%'}}>
          <span>{this.state.currentValue} %</span>
          <div style={{margin:'2em'}}>
          <Slider 
            onUpdateValue={this.updateValue.bind(this)}
            onMove={this.updateValue.bind(this)}/>        
          </div>
          <div style={{margin:'2em'}}>
          <Slider 
            value={45}
            onUpdateValue={this.updateValue.bind(this)}
            onMove={this.updateValue.bind(this)}/>
          </div>
          <div style={{margin:'2em'}}>
          <Slider 
            value={80}
            steps={[0, 10,20,25,50,80,100]}
            onUpdateValue={this.updateValue.bind(this)}
            onMove={this.updateValue.bind(this)}/>
          </div>
          <div style={{margin:'2em'}}>
          <Slider 
            value={50}
            disabled
            onUpdateValue={this.updateValue.bind(this)}
            onMove={this.updateValue.bind(this)}/>
          </div>             
      </div>
    );
  }
}

export default App;
