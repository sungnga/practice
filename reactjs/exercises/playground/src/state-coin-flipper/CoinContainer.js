import React, { Component } from 'react';
import { choice } from './helpers'
import Coin from './Coin'
import './CoinContainer.css'

class CoinContainer extends Component {
    static defaultProps = {
        coins: [
            { side: "heads", imgSrc: "https://tinyurl.com/react-coin-heads-jpg" },
            { side: "tails", imgSrc: "https://tinyurl.com/react-coin-tails-jpg"}
            
        ]
    }
    constructor(props) {
        super(props);
        this.state = {
            currCoin: null,
            nFlips: 0,
            nHeads: 0,
            nTails: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }
    flipCoin() {
        // Using choice helper function
        // Randomly choose a coin side from the coins array. Assign it to a new var
        const newCoin = choice(this.props.coins)
        // Pass in a callback to setState()
        this.setState(oldState => {
            return {
                currCoin: newCoin,
                nFlips: oldState.nFlips + 1,
                nHeads: oldState.nHeads + (newCoin.side === "heads" ? 1 : 0),
                nTails: oldState.nTails + (newCoin.side === "tails" ? 1 : 0)
            }
        })
    }
    handleClick(e) {
        this.flipCoin();
    }
    render() {
        // if currCoin is not true(null), don't render the <Coin />
        return (
            <div className="CoinContainer">
                <h2>Lets Flip a Coin!</h2> 
                <button onClick={this.handleClick}>Flip a Coin!</button>
                {this.state.currCoin && <Coin info={this.state.currCoin} />}
                <p>Out of {this.state.nFlips} flips, there have been {this.state.nHeads} heads and {this.state.nTails} tails.</p>
            </div>
        );
    }
}

export default CoinContainer;

