const nodemailer = require('nodemailer');

const sendEmail = async () => {
	let testAccount = await nodemailer.createTestAccount();

	// this came from ethereal.email webpage
	// when we Create Ethereal Account
	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'hayden.gottlieb38@ethereal.email',
			pass: 'FZPMc6ehrP4vu2KeKY'
		}
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"john" <john@example.com>', // sender address
		to: 'nga@example.com', // list of receivers
		subject: 'Hello ✔', // Subject line
		text: 'Testing email', // plain text body
		html: '<b>Testing email?</b>' // html body
	});
};

module.exports = sendEmail;
