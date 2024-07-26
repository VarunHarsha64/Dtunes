import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength : 6
    },
    role: {
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likedSongs : {
        type: [String],
        default: [],
    },
    dislikedSongs : {
        type: [String],
        default: [],
    },
    isArtist : {
        type: Boolean,
        default: false,
    },
    profilePhoto : {
        type : String,
        required: true,
    },
    playlists: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Playlist',
        default: [],
    },
});

export default model('User', userSchema);
 
