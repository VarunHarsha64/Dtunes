import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import songRoutes from "./routes/songRoutes.js";
import {v2 as cloudinary} from 'cloudinary';
import albumRouter from "./routes/albumRoutes.js";

dotenv.config();

console.log(process.env.MONGO_URL);

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
        });
        console.log('Cloudinary configured successfully');
    } catch (error) {
        console.error('Error configuring Cloudinary:', error);
    }
}

mongoose.connect(`${process.env.MONGO_URL}`).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

connectCloudinary();




const app = express();
const port = process.env.PORT || 8000

app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/', authRoutes);
app.use('/api/song', songRoutes);
app.use('/api/album', albumRouter);


app.get('/', (req, res) => {
    res.send('DTunes API is running!');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
