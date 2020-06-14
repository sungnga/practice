import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './JokeList.css';
import Joke from './Joke';

class JokeList extends Component {
	static defaultProps = {
		numJokesToGet: 10
	};
	constructor(props) {
    super(props);
    // Retrieve jokes from local storage if there's any, else set to empty array
    // Use JSON.parse() to convert string objects to JS objects
    // NOTE: 'jokes' inside .getItem('jokes') is the key
		this.state = {
			jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]')
		};
		this.handleClick = this.handleClick.bind(this);
  }
  // In the beginning, if there's no jokes, call .getJokes()
	componentDidMount() {
		if (this.state.jokes.length === 0) {
			this.getJokes();
		}
	}
	async getJokes() {
		// Load jokes
		let jokes = [];
		while (jokes.length < this.props.numJokesToGet) {
			let res = await axios.get('https://icanhazdadjoke.com/', {
				headers: { Accept: 'application/json' }
			});
			jokes.push({ id: uuidv4(), text: res.data.joke, votes: 0 });
		}
		// setState to contain existing jokes and new jokes
    // Once the state is set, it will save to local storage
    // Local storage can only store objects but in string form
    // Use JSON.stringify() to convert JS objects to string version
		this.setState(
			(st) => ({
				jokes: [...st.jokes, ...jokes]
			}),
			() =>
				window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
		);
  }
  // Once the updated vote is set in state, store the jokes list in local storage
	handleVote(id, delta) {
		this.setState(
			(st) => ({
				jokes: st.jokes.map((j) =>
					j.id === id ? { ...j, votes: j.votes + delta } : j
				)
			}),
			() =>
				window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
		);
	}
	handleClick() {
		this.getJokes();
	}
	render() {
		return (
			<div className='JokeList'>
				<div className='JokeList-sidebar'>
					<h1 className='JokeList-title'>
						<span>Dad</span> Jokes
					</h1>
					<img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
					<button onClick={this.handleClick} className='JokeList-getmore'>
						New Jokes
					</button>
				</div>
				<div className='JokeList-jokes'>
					{this.state.jokes.map((j) => (
						<Joke
							key={j.id}
							votes={j.votes}
							text={j.text}
							upvote={() => this.handleVote(j.id, 1)}
							downvote={() => this.handleVote(j.id, -1)}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default JokeList;
