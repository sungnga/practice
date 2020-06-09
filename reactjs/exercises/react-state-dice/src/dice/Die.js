import React, { Component } from 'react';
import './Die.css';

class Die extends Component {
	render() {
        //If this.props.rolling is true, set the class to shaking
        //If this.props.rolling is false, shaking class does not apply
		return (
			<i
				className={`Die fas fa-dice-${this.props.face} ${
					this.props.rolling && 'shaking'
				}`}
			/>
		);
	}
}

export default Die;
