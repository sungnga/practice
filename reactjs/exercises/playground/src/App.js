import React from 'react';
import './App.css'
import RollDice from './state-dice/RollDice';
import Lottery from './state-lotto/Lottery'
import CoinContainer from './state-coin-flipper/CoinContainer';
import BoxesContainer from './state-color-boxes/BoxesContainer';
import ShoppingList from './forms-shopping-list/ShoppingList';
import BoxList from './forms-box-maker/BoxList';


function App() {
  return (
    <div className="App">
      <RollDice />
      <Lottery />
      <Lottery title="Mini Daily" maxNum={10} numBalls={4} /> 
      <CoinContainer />
      <BoxesContainer />
      <ShoppingList />
      <BoxList />

    </div>
  );
}

export default App;
