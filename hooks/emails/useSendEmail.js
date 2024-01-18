const nodemailer = require("nodemailer");
const dotenv = require('dotenv').config();

async function UseSendEmail(email, subject, html) {

    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        auth: {
            user: "no-reply@themytriphub.com",
            pass: process.env.email,
        },
    });
    let info = await transporter.sendMail({
        from: "no-reply@themytriphub.com",
        to: email,
        subject: subject,
        text: "Here's a text version of the email.",
        html: html
    });
    console.log("Message sent: %s", info);
    console.log("View email: %s", nodemailer.getTestMessageUrl(info));



}

module.exports = UseSendEmail;

