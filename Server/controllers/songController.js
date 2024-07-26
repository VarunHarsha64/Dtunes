import songModel from "../models/songModel.js";
import User from "../models/userModel.js";
import {v2 as cloudinary} from 'cloudinary';


export const createSong = async (req, res) => {
    try {   
        const { title, artist, lyrics, releaseDate } = req.body;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        // Log file details for debugging
        console.log('Audio File:', audioFile);
        console.log('Image File:', imageFile);

        // Validate file types
        const validAudioTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav'];
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (!validAudioTypes.includes(audioFile.mimetype)) {
            console.error('Invalid audio file type:', audioFile.mimetype);
            return res.status(400).json({ success: false, error: "Invalid audio file type" });
        }

        if (!validImageTypes.includes(imageFile.mimetype)) {
            console.error('Invalid image file type:', imageFile.mimetype);
            return res.status(400).json({ success: false, error: "Invalid image file type" });
        }

        // Upload audio and image to Cloudinary
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: 'auto' });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });

        // Log the upload responses for debugging
        console.log('Audio Upload:', audioUpload);
        console.log('Image Upload:', imageUpload);

        const audioUrl = audioUpload.secure_url;
        const imageUrl = imageUpload.secure_url;
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

        // Create song data
        const songData = {
            title,
            artist,
            lyrics, 
            releaseDate,
            audioUrl,
            imageUrl,
            duration,
        };

        // Create a new song record in the database
        const song = new songModel(songData);
        await song.save();

        res.status(201).json({ success: true, message: "Song added successfully", song });
    } catch (error) {
        console.error("Error creating song:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getAllSongs = async (req, res) => {
    try {
        const songs = await songModel.find({});
        res.json({songs,success:true});
    } catch (error) {
        res.json({ success:false,message: "Something went wrong" });
    }
};

export const getSongById = async (req, res) => {
    try {
        const songId = req.params.id;
        console.log(songId);
        const song = await songModel.findById(songId);
        console.log(song)
        if (!song) return res.json({ error: "Song not found" });
        res.json(song);
    } catch (error) {
        res.json({ error: "Something went wrong at server" });
    }
};

export const updateSong = async (req, res) => {
    try {
        const songId = req.params.id;
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) return res.json({ error: "User not found" });
        if (!user.isArtist) return res.json({ error: "You are not an artist" });
        const song = await song.findById(songId);
        if (!song) return res.json({ error: "Song not found" });
        if (song.artistId.toString() !== userId) return res.json({ error: "You are not authorized to update this song" });
        const { title, artist, imageUrl, audioUrl, lyrics, releaseDate } = req.body;
        const updatedSong = await song.findByIdAndUpdate(songId, { title, artist, imageUrl, audioUrl, lyrics, releaseDate }, { new: true });
        res.json(updatedSong);
    } catch (error) {
        res.json({ error: "Something went wrong" });
    }
};

export const deleteSong = async (req, res) => {
    try {
        const songId = req.body.id;
        await songModel.findByIdAndDelete(songId);
        res.json({ success:true,message: "Song deleted successfully" });
    } catch (error) {
        res.json({ success:false,error: "Something went wrong" });
    }
};

export const likeSong = async (req, res) => {
    try {
        const songId = req.params.id;
        const userId = req.user.id;
        const song = await song.findById(songId);
        if (!song) return res.json({ error: "Song not found" });
        const user = await User.findById(userId);
        if (!user) return res.json({ error: "User not found" });
        if (user.likedSongs.includes(songId)) return res.json({ error: "You have already liked this song" });
        if (user.dislikedSongs.includes(songId)) {
            user.dislikedSongs.splice(user.dislikedSongs.indexOf(songId), 1);
            song.dislikes--;
        }
        user.likedSongs.push(songId);
        song.likes++;
        await user.save();
        await song.save();
        res.json({ message: "Song liked successfully" });
    } catch (error) {
        res.json({ error: "Something went wrong" });
    }
};

export const dislikeSong = async (req, res) => {
    try {
        const songId = req.params.id;
        const userId = req.user.id;
        const song = await song.findById(songId);
        if (!song) return res.json({ error: "Song not found" });
        const user = await User.findById(userId);
        if (!user) return res.json({ error: "User not found" });
        if (user.dislikedSongs.includes(songId)) return res.json({ error: "You have already disliked this song" });
        if (user.likedSongs.includes(songId)) {
            user.likedSongs.splice(user.likedSongs.indexOf(songId), 1);
            song.likes--;
        }
        user.dislikedSongs.push(songId);
        song.dislikes++;
        await user.save();
        await song.save();
        res.json({ message: "Song disliked successfully" });
    } catch (error) {
        res.json({ error: "Something went wrong" });
    }
};