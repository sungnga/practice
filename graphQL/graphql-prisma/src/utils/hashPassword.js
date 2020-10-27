import bcrypt from 'bcryptjs';

const hashPassword = (password) => {
	// Password validation
	if (password.length < 8) {
		throw new Error('Password must be 8 characters or longer');
	}

	// The bcrypt.hash() method takes in plain text and returns the hashed version
	// It takes 2 arguments:
	//	- 1st arg is the plain text password
	//	- 2nd arg is a salt, we provide the length of salt we want to use
	// A salt is a random series of chars that are hashed along with the string being hashed, making the hash password more secure
	// This method returns a promise. That promise resolves with the hash value
	// Return the hash value. We don't need to use the 'await' keyword since we're returning it
	return bcrypt.hash(password, 10);
};

export { hashPassword as default };
