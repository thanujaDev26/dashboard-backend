const Admin = require('../Modals/AdminModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let refreshTokens = [];

exports.signUpUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        const newUser = await Admin.create(req.body);
        if (!newUser) {
            return res.status(400).json({ status: 'error', message: 'Null users are not allowed' });
        }

        res.status(201).json({ status: 'success', message: 'Successfully registered', user: newUser });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Admin.findOne({ email });

        const role = user.role || "admin";

        if(!user){
            return res.status(400).json({ status: 'error', message: 'Invalid email' });
        }

        if(!bcrypt.compare(password, user.password)){
            return res.status(400).json({ status: 'error', message: 'Invalid password' });
        }

        // if (!user || !(await bcrypt.compare(password, user.password))) {
        //     return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
        // }

        const accessToken = jwt.sign(
            { id: user._id, role: role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { id: user._id, role: role },
            process.env.RE_TOKEN_KEY,
            { expiresIn: '24h' }
        );

        refreshTokens.push(refreshToken);

        return res.status(200).json({
            status: 'success',
            user: {
                id: user._id,
                email: user.email,
                role: role,
                accessToken,
                refreshToken
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getToken = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token required' });
    }

    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    jwt.verify(refreshToken, process.env.RE_TOKEN_KEY, (err, user) => {
        if (err) return res.sendStatus(403);

        const newAccessToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ accessToken: newAccessToken });
    });
};
