'use client';
import React from 'react';

const data = [
  {
    "name": "Bitcoin",
    "currency": "BTC"
  },
  {
    "name": "Ethereum",
    "currency": "ETH"
  },
  {
    "name": "Litecoin",
    "currency": "LTC"
  },
  {
    "name": "Binance Coin",
    "currency": "BNB"
  },
  {
    "name": "Dash",
    "currency": "DSH"
  },
  {
    "name": "Ripple",
    "currency": "XRP"
  },
  {
    "name": "EOS",
    "currency": "EOS"
  },
  {
    "name": "Qredo",
    "currency": "QRDO"
  },
  {
    "name": "Radix",
    "currency": "XRD"
  },
  {
    "name": "Luna2",
    "currency": "LUNA2"
  },
  {
    "name": "Sushi",
    "currency": "SUSHI"
  },
  {
    "name": "v.systems",
    "currency": "VSY"
  },
  {
    "name": "0x",
    "currency": "ZRX"
  },
  {
    "name": "Aptos",
    "currency": "APT"
  },
  {
    "name": "UNUS SED LEO",
    "currency": "LEO"
  },
  {
    "name": "Dogecoin",
    "currency": "DOGE"
  },
  {
    "name": "yearn.finance",
    "currency": "YFI"
  },
  {
    "name": "Polygon",
    "currency": "MATIC"
  },
  {
    "name": "Wrapped NCG",
    "currency": "WNCG"
  },
  {
    "name": "Bonk",
    "currency": "BONK",
    "icon": "https://static.bitfinex.com/images/icons/BONK.png"
  }
]

export default function Test() {
  const [state, setState] = React.useState(data);
  const [count, setCount] = React.useState(0);
  const removeItem = (index: number) => () => {
    const newState = state.filter((_, i) => i !== index);
    setState(newState);
  }

  if (count === 2) {
    throw new Error('Test Error');
  }
  return (
    <ul onClick={() => setCount(c => ++c)}>
      Count: {count}
      {state.map((item, index) => (
        <li key={item.name} onClick={removeItem(index)}>{item.name}</li>
      ))}
    </ul>
  )
}
