const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nga422@gmail.com',
        subject: 'Thanks for joining the Task App!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app. `
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nga422@gmail.com',
        subject: 'Goodbye from the Task App',
        text: `We are sad to see you go, ${name}. Let us know how we can improve your experience.`
    })
}

module.exports = { sendWelcomeEmail, sendGoodbyeEmail }

// sgMail.send({
//     to: 'nga422@gmail.com',
//     from: 'nga422@gmail.com',
//     subject: 'This is my very first creation!',
//     text: 'I hope this one actually get to you!'
// })

// run: node src/emails/account.js to send the email off