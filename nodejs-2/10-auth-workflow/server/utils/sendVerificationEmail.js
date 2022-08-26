const sendEmail = require('./sendEmail');

// origin is the URL to the front-end
const sendVerificationEmail = async ({
	name,
	email,
	verificationToken,
	origin
}) => {
	const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

	const message = `<p>Please confirm your email by clicking on the following link: <a href="${verifyEmail}">Verify Email</a></p>`;

	// sendEmail function is an async function. It returns a promise
	return sendEmail({
		to: email,
		subject: 'Email Confirmation',
		html: `<h4>Hello, ${name}</h4>
    ${message}
    `
	});
};

module.exports = sendVerificationEmail;
