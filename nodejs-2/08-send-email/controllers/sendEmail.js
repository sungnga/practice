const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

// send email with Ethereal
const sendEmailEthereal = async (req, res) => {
	let testAccount = await nodemailer.createTestAccount();

	// nodemailer configuration
	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'nathan.zieme@ethereal.email',
			pass: 'u9WzQZ495H9NdxKcnU'
		}
	});

	let info = await transporter.sendMail({
		from: '"Nga", <nga@example.com>',
		to: 'bar@example.com',
		subject: 'Hello',
		html: '<h2>Sending Emails with Node.js</h2>'
	});

	res.json(info);
};

// send email with SendGrid
const sendEmail = async (req, res) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: 'nga@example.com', // Change to your recipient
		from: 'myemail@example.com', // Change to your verified sender
		subject: 'Sending with SendGrid is Fun',
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>'
	};
	const info = await sgMail.send(msg);
	res.json(info); // This is for testing purposes only
};

module.exports = sendEmail;
