import express from "express";
import cors from 'cors';
import multer from 'multer';
import { registerUser, loginUser, getProfilePhoto } from "../controllers/authController.js";

const router = express.Router();

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/register', upload.single('profilePhoto'), registerUser);

router.post('/login', loginUser);

router.get('/profile/:id', getProfilePhoto)

export default router;