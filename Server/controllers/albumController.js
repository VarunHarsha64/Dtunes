import {v2 as cloudinary} from 'cloudinary';
import albumModel from '../models/playlistModel.js';
import songModel from '../models/songModel.js'



export const addAlbum = async(req,res)=>{
    try {
        console.log(req.body)
        const {name,userId,desc,privateStatus} = req.body;
        console.log(req.file)
        const imageFile = req.file;
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validImageTypes.includes(imageFile.mimetype)) {
            console.error('Invalid image file type:', imageFile.mimetype);
            return res.status(400).json({ success: false, error: "Invalid image file type" });
        }
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const imageUrl = imageUpload.secure_url;

        const playlistData = {
            name, userId,desc, imageUrl,privateStatus
        }

        const album = albumModel(playlistData);
        await album.save();
        res.json({success:true,imageUrl});
    } catch (error) {
        res.json({error:error.message, success:false})
    }
}

export const listAlbum = async (req,res)=>{
    try {
        const albums = await albumModel.find({});
        console.log(albums)
        res.json({success:true,albums});
    } catch (error) {
        res.json({success:false,message: "Something went wrong"});
    }
}

export const removeAlbum = async (req,res)=>{
    try {
        const albumId = req.body.id;
        await albumModel.findByIdAndDelete(albumId);
        res.json({success:true,message: "Album deleted successfully"});
    } catch (error) {
        res.json({success:false,error: "Something went wrong"});
    }
}

export const getAlbumById = async (req,res)=>{
    try {
        const albumId = req.params.id;
        const album = await albumModel.findById(albumId);
        if (!album) return res.json({ error: "Album not found" });
        res.json(album);
    } catch (error) {
        res.json({ error: "Something went wrong at server" });
    }
}

export const getAlbumsByUserId = async (req,res)=>{
    try {
        const userId = req.params.id;
        console.log(userId);
        const albums = await albumModel.find({userId:userId});
        if (!albums) return res.json({ error: "Albums not found" });
        res.json(albums);
    } catch (error) {
        console.log(error);
        res.json({ error: "Something went wrong at server" });
    }
}

export const updateAlbum = async (req,res)=>{
    try {
        const albumId = req.params.id;
        const userId = req.user.id;
        const album = await albumModel.findById(albumId);
        if (!album) return res.json({ error: "Album not found" });
        if (album.userId.toString() !== userId) return res.json({ error: "You are not authorized to update this album" });
        const { name, desc, privateStatus } = req.body;
        const updatedAlbum = await albumModel.findByIdAndUpdate(albumId, { name, desc, privateStatus }, { new: true });
        res.json(updatedAlbum);
    } catch (error) {
        res.json({ error: "Something went wrong" });
    }
}

export const addSongToAlbum = async (req,res)=>{
    try {
        const {songId, albumId } = req.body;
        console.log(songId, albumId);
        if (!songId || !albumId) {
            return res.status(400).json({ error: 'Song ID and Album ID are required' });
        }

        const album = await albumModel.findById(albumId);
        if (!album) {
            return res.status(404).json({ error: 'Album not found' });
        }

        // Check if the songId is already in the album's songs list
        if (album.songs.includes(songId)) {
            return res.status(400).json({ error: 'Song already exists in the album' });
        }

        // Add the songId to the album's songs list
        album.songs.push(songId);
        await album.save();

        res.status(200).json({ message: 'Song added to album successfully', album });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add song to album' });
    }
}

export const removeSongFromAlbum = async (req,res)=>{
    try {
        const {songId, albumId } = req.body;
        console.log(songId, albumId);
        if (!songId || !albumId) {
            return res.status(400).json({ error: 'Song ID and Album ID are required' });
        }

        const album = await albumModel.findById(albumId);
        if (!album) {
            return res.status(404).json({ error: 'Album not found' });
        }

        // Check if the songId is already in the album's songs list
        if (album.songs.includes(songId)) {
            console.log(album);
            await album.songs.pull(songId);
            console.log(album);
            await album.save();
            return res.status(200).json({ message: 'Song removed from album successfully', album });
        } else {
            return res.status(400).json({ error: 'Song not found in the album' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Failed to add song to album' });
    }
}

export const getSongsOfPlaylist = async (req,res)=>{
    try {
        const playlistId = req.params.id;
        const playlist = await albumModel.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        const songs = await Promise.all(playlist.songs.map(async (songId) => {
            const song = await songModel.findById(songId);
            return song;
        }));
        res.status(200).json({ songs });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch songs of playlist' });
    }
}





