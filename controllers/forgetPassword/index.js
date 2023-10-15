const express = require('express');
const router = express.Router();
const changePasswordlModel = require('../../models/forgetPassword');
const userModel = require('../../models/users');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const UseSendEmail = require('./../../hooks/emails/useSendEmail');



router.post('/forgetpassword/', (req, res) => {

    const { email } = req.body;



    if (email) {
        userModel.findOne({
            where: {
                email
            }
        }).then((data) => {
            if (data) {
                var token = uuid.v4();
                const subject = 'Plan - Get a new password. ';
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

						<p><img alt="Logo da PLAN" src="https://planejadordeintercambio.com.br/img/person.png" style="width:150px" /></p>

						<h1><span style="font-family:Arial,Helvetica,sans-serif"><strong>Getting a new Password</strong></span></h1>

						<p>Hello,</p>

						<p>You requested an email to generate a new password.</p>

						<p>To get started, please &nbsp;by clicking the button below:</p>
						<span style="font-size:16px"><span style="font-family:Arial,Helvetica,sans-serif"><strong><a href="http://localhost:3001/forgetpassword/${token}" style="display: inline-block; background-color: #6AD9A8; color: #000; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; width:60%;">New Password</a></strong></span></span>

						<p>If you have any questions or need assistance, feel free to contact our support team at contact@plantraveplanner.com.</p>

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

                UseSendEmail(email, subject, html);
                changePasswordlModel.create({
                    userId: data.id,
                    token: token,
                    valid: true
                });
                res.status(200).json({ success: 'Email Gered' });
            } else {
                res.status(404).json({ error: 'User not exist' });
            }
        }).catch((error) => res.json(error));

    } else {
        res.status(300).json({ error: 'Fault Infors' });

    }
})

router.patch('/forgetpassword/:token', (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    changePasswordlModel.findOne({
        where: {
            token
        }
    }).then((data) => {
        if (data) {
            if (data.valid == 1) {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt)
                userModel.update({
                    password: hash
                }, {
                    where: {
                        id: data.userId
                    }
                }).then(() => {
                    changePasswordlModel.update({
                        valid: false
                    },
                        {
                            where: {
                                userId: data.userId

                            }
                        })
                    res.status(200).json({ success: 'Password Change' })
                })
            } else {
                res.status(203).json({ error: 'Token Used' })

            }

        }
    })


});

module.exports = router;