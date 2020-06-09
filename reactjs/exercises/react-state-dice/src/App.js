import React from 'react';
import './App.css'
import RollDice from './dice/RollDice';
import Lottery from './lotto/Lottery'

function App() {
  return (
    <div className="App">
    <RollDice />
      <Lottery />
      <Lottery title="Mini Daily" maxNum={10} numBalls={4} /> 
    </div>
  );
}

export default App;


