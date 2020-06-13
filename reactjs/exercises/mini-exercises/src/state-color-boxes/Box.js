import React, { Component } from 'react';
import './Box.css';
import { choice } from './helpers';

// Child component
class Box extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: choice(this.props.colors),
		};
		this.handleClick = this.handleClick.bind(this);
	}
	pickColor() {
        let newColor;
        // When the newColor is the same as this.state.color, run the choice() helper function to generate a new color
        do {
            newColor = choice(this.props.colors)
        } while (newColor === this.state.color)


		this.setState({ color: newColor });
	}
	handleClick() {
		this.pickColor();
	}
	render() {
		// NOTE: the double braces, cause we're passing in an object
		return (
			<div
				onClick={this.handleClick}
				className='Box'
				style={{ backgroundColor: this.state.color }}
			></div>
		);
	}
}

export default Box;
