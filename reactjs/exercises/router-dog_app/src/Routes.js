import React, { Component } from 'react';
import DogList from './DogList';
import DogDetails from './DogDetails';
import { Switch, Route, Redirect } from 'react-router-dom';

class Routes extends Component {
  render() {
    // A helper function to find the matching dog
    // Have access to props that get passed down from the render attribute
    const getDog = (props) => {
      // console.log(props)
      let name = props.match.params.name;
      // this.props.dogs is props that gets passed down from App.js
			let currentDog = this.props.dogs.find(
				(dog) => dog.name.toLowerCase() === name.toLowerCase()
      );
      // DogDetails component: spread in the existing props and a new prop called 'dog' that has the details of the matching dog name
			return <DogDetails {...props} dog={currentDog} />;
		};
		return (
			<Switch>
				<Route
					exact
					path='/dogs'
					render={() => <DogList dogs={this.props.dogs} />}
				/>
				<Route exact path='/dogs/:name' render={getDog} />
				<Redirect to='/dogs' />
			</Switch>
		);
	}
}

export default Routes;
