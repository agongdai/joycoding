'use client';

import React from 'react';

type IInputProps = {
  passed: string;
};

type IState = {
  passed: string;
};

export default class Child extends React.Component<IInputProps, IState> {
  state = { passed: this.props.passed };
  // constructor(props: IInputProps) {
  //   super(props);
  // }

  static getDerivedStateFromProps(nextProps: IInputProps, prevState: IState) {
    if (nextProps.passed !== prevState.passed) {
      return { passed: nextProps.passed };
    }
    return null;
  }

  render() {
    console.log("Child is getting rendered");
    return (
      <div>
        Child: {this.state.passed}
        <p>React version: {React.version}</p>
        <p>data from Service Worker: </p>
      </div>
    );
  }
}
