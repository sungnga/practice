import React, { Component } from 'react';
import './Die.css';

class Die extends Component {
	static defaultProps = {
		numberWords: ['one', 'two', 'three', 'four', 'five', 'six'],
		val: 5
	};
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.props.handleClick(this.props.idx);
	}
	render() {
		const { numberWords, locked, val, disabled, rolling } = this.props;
		// Convert the numeric numbers into word numbers
		// Since numberWords is an array, we want to access the item by its index, hence use -1
		// Next attach that word number to the end of font awesome icon class name
		let classes = `Die fas fa-dice-${numberWords[val - 1]} fa-5x `;
		if (locked) classes += 'Die-locked';
		if (rolling) classes += 'Die-rolling';
		return (
			<i className={classes} onClick={this.handleClick} disabled={disabled} />
		);
	}
}

export default Die;
