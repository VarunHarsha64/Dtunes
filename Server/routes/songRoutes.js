import { createSong, deleteSong, getAllSongs, getSongById, likeSong, dislikeSong, checkLikeDislike } from "../controllers/songController.js";
import express from "express";
import upload from "../middleware/multer.js";

const songRoutes = express.Router();

songRoutes.post('/add',upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]),createSong);
songRoutes.get('/list',getAllSongs);
songRoutes.post('/remove', deleteSong);
songRoutes.get('/get/:id',getSongById);
songRoutes.post('/like', likeSong);
songRoutes.post('/dislike', dislikeSong);
songRoutes.post('/checkLikeDislike',checkLikeDislike)


export default songRoutes;