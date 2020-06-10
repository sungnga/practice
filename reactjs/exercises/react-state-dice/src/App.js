import React from 'react';
import './App.css'
import RollDice from './dice/RollDice';
import Lottery from './lotto/Lottery'
import CoinContainer from './coin-flipper/CoinContainer';
import BoxesContainer from './color-boxes/BoxesContainer';

function App() {
  return (
    <div className="App">
      <RollDice />
      <Lottery />
      <Lottery title="Mini Daily" maxNum={10} numBalls={4} /> 
      <CoinContainer />
      <BoxesContainer />
    </div>
  );
}

export default App;
