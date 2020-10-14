const Subscription = {
	// The property name needs to match up with the name of the subscription defined in type definition
	// Unlike Query and Mutation, the value for count is not a method, it's an object
	// On this object, setup a subscribe() method
	// - The subscribe method runs every time someone tries to subscribe to count
	// - It's a resolver method, so has all the regular arguments a resolver method gets
	// - Destructure the pubsub property from context argument
	// - This function returns something from pubsub and call the .asyncIterator() method on pubsub
	// - asyncIterator method takes a string channel name as an argument. The asyncIterator method sets up the channel
	// - The .publish() method publishes the data to all the subscribers
	// - The publish method takes 2 args: 1st arg is the channel name and 2nd arg is an object which contains the data that get sent to the client
	count: {
		subscribe(parent, args, { pubsub }, info) {
			let count = 0;

			setInterval(() => {
				count++;
				pubsub.publish('count', {
					count
				});
			}, 2000);

			return pubsub.asyncIterator('count');
		}
	}
};

export { Subscription as default };
