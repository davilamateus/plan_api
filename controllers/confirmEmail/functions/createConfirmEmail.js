const confirmEmailModel = require('../../../models/confirmEmail');
const uuid = require('uuid');

function CreateConfirmEmail(userId) {
    var token = uuid.v4();
    return (
        confirmEmailModel.create({
            userId, token, valid: true
        })
    );

}
module.exports = CreateConfirmEmail;