
import mongoose from "mongoose";

const {Schema, model} = mongoose;

const songSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    audioUrl: {
        type: String,
        required: true,
    },
    lyrics: {
        type: String,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    artistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true      
    },
    duration : {
        type: String,
        required: true,
    }
});


const songModel = model('Song', songSchema);
export default songModel;