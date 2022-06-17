const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
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

module.exports = sendEmail;
