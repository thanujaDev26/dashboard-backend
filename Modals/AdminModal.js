const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is required"]
    },
    studentID: {
        type: String,
        required: true,
        unique: [true, "SC Number is required"]
    },
    password: {
        type: String,
        required: true,
    }
});


AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
