const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Debes poner el nombre del autor"],
        },

        style: {
            type: [String],
            enum: ["electronic", "rock", "heavy", "funk", "indie", "pop", "rap", "jazz", "blues"],
        },

        contactEmail: {
            type: String,
            required: true,
            unique: true,
        },

        startingDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Author = mongoose.model("authors", authorSchema);

module.exports = Author;