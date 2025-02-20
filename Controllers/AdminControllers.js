const Admin = require('../Modals/AdminModal')
const bcrypt = require('bcrypt');

exports.signUpUser = async (request, response) => {
    try {
        const signUpUser = await Admin.create(request.body);
        if (!signUpUser) {
            return response.status(400).send({
                status: 'error',
                message: 'Null users are not allowed'
            });
        }
        return response.status(200).send({
            status: 'success',
            message: 'Successfully registered',
            user: signUpUser
        });
    } catch (err) {
        return response.status(400).send({
            status: 'error',
            message: err.message
        });
    }
};

