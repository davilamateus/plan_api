const userModel = require("../../../models/users");
const modelChangePassword = require("../../../models/forgetPassword");
const uuid = require("uuid");
const { isEmail } = require("../../../functions/isEmail");
const { useSendEmail } = require("./../../../hooks/emails/useSendEmail");

const forgetPassword = (req, res) => {
    const { email } = req.body;

    if (!isEmail(email)) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        userModel
            .findOne({
                where: {
                    email
                }
            })
            .then((data) => {
                if (data) {
                    var token = uuid.v4();

                    modelChangePassword
                        .create({
                            userId: data.id,
                            token,
                            valid: true
                        })
                        .then(() => {
                            const subject = "The My Trip Hub - Get a new password. ";
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

						<p><img alt="Logo da PLAN" src="https://themytriphub.com/img/person.png" style="width:150px" /></p>

						<h1><span style="font-family:Arial,Helvetica,sans-serif"><strong>Getting a new Password</strong></span></h1>

						<p>Hello,</p>

						<p>You requested an email to generate a new password.</p>

						<p>To get started, please &nbsp;by clicking the button below:</p>
						<span style="font-size:16px"><span style="font-family:Arial,Helvetica,sans-serif"><strong><a href="https://themytriphub.com/forgetpassword/${token}" style="display: inline-block; background-color: #6AD9A8; color: #000; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; width:60%;">New Password</a></strong></span></span>

						<p>If you have any questions or need assistance, feel free to contact our support team at contact@themytriphub.com</p>

						<p>Thank you again for choosing The My Trip Hub!</p>

						<p>Best regards,<br />
						Your The My Trip Hub Team</p>

						<p>&nbsp;</p>
						</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
	</tbody>
</table>

`;

                            useSendEmail(email, subject, html);
                            res.status(200);
                            res.json({ result: "Add" });
                        })
                        .catch(() => {
                            res.status(400);
                            res.json({ result: "Error" });
                        });
                } else {
                    res.status(404);
                    res.json({ result: "Error" });
                }
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { forgetPassword };
