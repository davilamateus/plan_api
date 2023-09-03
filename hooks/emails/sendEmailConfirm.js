const Email = require('../../../../Models/Users/Auth/VerificEmail');
const nodemailer = require("nodemailer");
const uuid = require('uuid');
const token = uuid.v4();





function sendEmail() {
    return (email) => {
        Email.create({ userEmail: email, token: token })

        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            auth: {
                user: "no-reply@planejadordeintercambio.com.br",
                pass: "Goias123.",
            },
        });
        let info = transporter.sendMail({
            from: "no-reply@planejadordeintercambio.com.br",
            to: `${email}`,
            subject: "Planejador de Intercâmbio - Verificação de Email!",
            text: "Here's a text version of the email.",
            html: `<p style="text-align: center;">Clique no link abaixo para validar os eu email:</p>

    <p style="text-align: center;">&nbsp;</p>
    
    <p style="text-align: center;">&nbsp;</p>
    
    <p style="text-align: center;"> <h1>Varificando o email</h1><a href="https://localhost:3001/confirm-email/${token}">https://localhost:3001/confirm-email/${token}</a></p>
    
    <p style="text-align: center;">&nbsp;</p>
    `
        });
        console.log("Message sent: %s", info.messageId);
        console.log("View email: %s", nodemailer.getTestMessageUrl(info));


    }
}

module.exports = sendEmail;

