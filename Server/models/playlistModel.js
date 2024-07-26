import mongoose from "mongoose";

const {Schema, model} = mongoose;

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    songs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Song',
        default: [],
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
    totalDuration : {
        type: Number,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    desc : {
        type: String,
        default: "No description found"
    },
    private : {
        type: Boolean,
        default: false,
    }
});

export default model('Playlist', playlistSchema);
 