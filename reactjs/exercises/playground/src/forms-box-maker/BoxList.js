import React, { Component } from 'react';
import Boxx from './Boxx';
import NewBoxForm from './NewBoxForm';

class BoxList extends Component {
	constructor(props) {
		super(props);
		this.state = { boxes: [] };
		this.create = this.create.bind(this);
	}
	remove(id) {
		this.setState({
			boxes: this.state.boxes.filter((box) => box.id !== id),
		});
	}
	create(newBox) {
		this.setState((state) => ({
			boxes: [...state.boxes, newBox],
		}));
	}
	render() {
		// NOTE: the key property is specific for React
        // The id property specific to the box item. Use this id to remove the box, for example
        // ANOTHER METHOD of passing a remove() method to the child component with a callback. You don't need to bind
		const boxes = this.state.boxes.map((box) => (
			<Boxx
				key={box.id}
				id={box.id}
				width={box.width}
				height={box.height}
                color={box.color}
                removeBox={() => this.remove(box.id)}
			/>
		));
		return (
			<div>
				<h1>Color Box Maker</h1>
				<NewBoxForm createBox={this.create} />
				{boxes}
			</div>
		);
	}
}

export default BoxList;
