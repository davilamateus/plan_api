const confirmEmailModel = require('../../models/confirmEmail');
const uuid = require('uuid');
const { useSendEmail } = require('./../emails/useSendEmail');

const useCreateConfirmEmail = (userId, email) => {
	var token = uuid.v4();

	const subject = 'The My Trip Hub - Confirm your email.';
	const html = `
<table cellpadding="0" cellspacing="0" style="width:100%">
	<tbody>
		<tr>
			<td style="background-color:#f4f4f4">
			<table cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:5px; box-shadow:0px 0px 10px rgba(0,0,0,0.1); margin:20px auto; width:600px">
				<tbody>
					<tr>
						<td style="text-align:center">
						<p>&nbsp;</p>

						<p><img alt="Logo da PLAN" src="https://themytryhub.com/img/person.png" style="width:150px" /></p>

						<h1><span style="font-family:Arial,Helvetica,sans-serif"><strong>Welcome to PLAN Platform!</strong></span></h1>

						<p>Hello,</p>

						<p>Thank you for joining the The My Trip Hub! We&#39;re thrilled to have you as a part of our community.</p>

						<p>To get started, please confirm your email address by clicking the button below:</p>
						<span style="font-size:16px"><span style="font-family:Arial,Helvetica,sans-serif"><strong><a href="https://themytryhub.com/confirmemail/${token}" style="display: inline-block; background-color: #6AD9A8; color: #000; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; width:60%;">Confirm Email</a></strong></span></span>

						<p>If you have any questions or need assistance, feel free to contact our support team at contact@themytriphub.com</p>

						<p>Thank you again for choosing PLAN Platform!</p>

						<p>Best regards,<br />
						Your PLAN Team</p>

						<p>&nbsp;</p>
						</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
	</tbody>
</table>
`

	useSendEmail(email, subject, html);
	return (
		confirmEmailModel.create({
			userId, token, valid: true
		})
	);

}
module.exports = { useCreateConfirmEmail };