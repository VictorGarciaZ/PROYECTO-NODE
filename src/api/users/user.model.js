const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Debes introducir un email'],
            unique: true,
        },
        
        password: {
            type: String,
            required: [true, 'Debes introducir una contraseña'],
        },

        name: {
            type: String,
        },

        role: {
            type: String,
            default: 'user',
            enum: ['user', 'admin', 'author', 'listener'],
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('users', userSchema);

module.exports = User;