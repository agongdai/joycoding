'use client';
import React from 'react';

import Child from '@myex/components/Test/Child';

export default class Parent extends React.Component {
  state = { message: 'from parent' };
  componentDidMount() {
    // this.setState({ messageDisplayed: true })
    // setTimeout(() => , 1000);
  }

  changeMessage = () => {
    this.setState({ message: 'changed' });
  }

  render() {
    console.log("Parent is getting rendered");
    return (
      <div className="App">
        <button onClick={this.changeMessage}>Change Message</button>
        <Child passed={this.state.message} />
        {/*{this.props.children}*/}
      </div>
    );
  }
}
