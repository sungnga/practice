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
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
      loading: false
    };
    this.seenJokes = new Set(this.state.jokes.map(j => j.text))
    // console.log(this.seenJokes)
		this.handleClick = this.handleClick.bind(this);
  }
  // In the beginning, if there's no jokes, call .getJokes()
	componentDidMount() {
		if (this.state.jokes.length === 0) {
			this.getJokes();
		}
	}
  async getJokes() {
    try {
      // Load jokes
      let jokes = [];
      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' }
        });
        let newJoke = res.data.joke;
        // If the new joke is not in the seenJokes set, push the new joke into the jokes array
        if (!this.seenJokes.has(newJoke)) {
          jokes.push({ id: uuidv4(), text: newJoke, votes: 0 });
        } else {
          console.log('FOUND A DUPLICATE')
          console.log(newJoke)
        }
      }
      // setState to contain existing jokes and new jokes
      // Once the state is set, it will save to local storage
      // Local storage can only store objects but in string form
      // Use JSON.stringify() to convert JS objects to string version
      this.setState(
        (st) => ({
          loading: false,
          jokes: [...st.jokes, ...jokes]
        }),
        () =>
          window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
      );
    } catch (err) {
      alert(err);
      this.setState({loading: false})
    }
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
  // After loading is set to true, we want the callback function to run
  // NOTE: we don't want to invoke the .getJokes() function inside the onClick event. We want to call it when the user clicks the button
	handleClick() {
		this.setState({loading: true}, this.getJokes)
	}
  render() {
    // Return early if loading state is true
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="JokeList-title">Loading...</h1>
        </div>
      )
    }
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
