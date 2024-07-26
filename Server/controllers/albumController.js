import {v2 as cloudinary} from 'cloudinary';
import albumModel from '../models/playlistModel.js';



export const addAlbum = async(req,res)=>{
    try {
        console.log(req.body)
        const {name,userId,desc} = req.body;
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
            name, userId,desc, imageUrl,
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




