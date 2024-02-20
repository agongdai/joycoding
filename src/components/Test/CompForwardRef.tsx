'use client';
import React from 'react';

type IInputProps = {
  label: string;
};

const InputText = React.forwardRef<HTMLInputElement, IInputProps>(function Name(props, ref) {
  return (
    <div>
      <label>{props.label}</label>
      <input ref={ref} />
    </div>
  );
});

export default function CompForwardRef() {
  const ref = React.useRef<HTMLInputElement>(null);

  function focus() {
    console.log('ref', ref);
    ref?.current?.focus();
  }

  return (
    <div className="App">
      <InputText ref={ref} label="my input" />
      <button onClick={focus}>Focus</button>
    </div>
  );
}
