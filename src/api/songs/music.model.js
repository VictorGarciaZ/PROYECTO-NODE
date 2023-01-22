const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Debes especificar un nombre para la canción"],
            unique: true,
        },

        style: {
            type: [String],
            enum: ["electronic", "rock", "heavy", "funk", "indie", "pop", "rap", "jazz", "blues"],
        },
        
        author: {
            type: mongoose.Types.ObjectId,
            ref: "authors",
        },
        
        description: {
            type: String,
        },

        duration: {
            type: Number,
        },

    },
    {
        timestamps: true,
    }
);


const Music = mongoose.model('songs', musicSchema);

module.exports = Music;