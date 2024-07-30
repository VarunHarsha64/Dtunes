import express from 'express';
import {addAlbum, getAlbumById, listAlbum, removeAlbum, getAlbumsByUserId, addSongToAlbum, removeSongFromAlbum} from '../controllers/albumController.js';
import upload from '../middleware/multer.js';

const albumRouter = express.Router();

albumRouter.post('/add',upload.single('image'),addAlbum);
albumRouter.get('/list',listAlbum);
albumRouter.post('/remove',removeAlbum);
albumRouter.get('/get/:id',getAlbumById)
albumRouter.get('/userGet/:id', getAlbumsByUserId);
albumRouter.post('/addToAlbum',addSongToAlbum);
albumRouter.post('/removeFromAlbum', removeSongFromAlbum)


export default albumRouter;