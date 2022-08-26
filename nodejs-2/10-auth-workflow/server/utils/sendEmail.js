const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
	let testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport(nodemailerConfig);

	// since sendEmail is an async funct, it'll return a promise
	// no need to use the await keyword here
	return transporter.sendMail({
		from: '"john" <john@example.com>', // sender address
		to,
		subject,
		html
	});
};

module.exports = sendEmail;
