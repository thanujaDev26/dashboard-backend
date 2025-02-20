const Admin = require('../Modals/AdminModal')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let refreshTokens=[];

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


exports.signInUser = async (request, response) => {
    try {
        const { email, password } = request.body;
        const signInUser = await Admin.findOne({ email });
        if (!signInUser) {
            return response.status(400).send({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        const isMatch = await bcrypt.compare(password, signInUser.password);
        if (!isMatch) {
            return response.status(400).send({
                status: 'error',
                message: 'Invalid password'
            });
        }

        console.log(signInUser)

        // const accessToken = jwt.sign({ id: signInUser._id, role: 'admin' }, process.env.JWT_SECRET, {expiresIn: '1h'});
        // const refreshToken = jwt.sign({ id: signInUser._id, role: 'admin' }, process.env.RE_TOKEN_KEY, { expiresIn: '24h' });

        // refreshTokens.push(refreshToken);

        return response.status(200).send({
            status: 'success',
            // user: {
            //     id: signInUser._id,
            //     email: signInUser.email,
            //     role: signInUser.role,
            //     accessToken: accessToken,
            //     refreshToken: refreshToken
            // }
            user: signInUser
        });
    } catch (err) {
        return response.status(400).send({
            status: 'error',
            message: err.message
        });
    }
};

exports.getToken = async (req,res)=>{
    const { refreshToken } = req.body;
    if(refreshToken == null) {
        return res.status(401).json({
            message: 'Refresh token required'
        });
    }
    if(!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({
            message: 'Invalid refresh token'
        });
    }
    jwt.verify(refreshToken,process.env.RE_TOKEN_KEY,(err,user)=>{
        if(err) {
            res.sendStatus(403);
        }
        const accessToken=jwt.sign({name:user.name},process.env.TOKEN_KEY,{expiresIn: '1h'});
        res.json({
            accessToken: accessToken
        });
    });
}

