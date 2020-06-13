import React, { Component } from 'react';
import Box from './Box'
import {getRandomColor} from './helpers'

class BoxesContainer extends Component {
    static defaultProps = {
        numBoxes: 18,
        allColors: ['purple', 'magenta', 'violet', 'pink', 'slateBlue', 'orangeRed', 'olive', 'darkGreen']
    }
    render() {
        const boxes = Array.from({length: this.props.numBoxes}).map(() => <Box colors={this.props.allColors} />)
        return (
            <div className="BoxesContainer">
                {boxes}
            </div>
        );
    }
}

export default BoxesContainer;