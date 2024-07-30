import express from 'express';
import { searchSongs, searchPlaylists, searchUsers } from '../controllers/searchController.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { type, query } = req.query;
    console.log(type, query);
    try {
        if (type === '0') {
            const songs = await searchSongs(query);
            res.status(200).json(songs);
        } else if (type === '1') {
            const playlists = await searchPlaylists(query);
            res.status(200).json(playlists);
        } else if (type === '2') {
            const users = await searchUsers(query);
            res.status(200).json(users);
        } else {
            res.status(400).json({ message: 'Invalid search type' });
        }
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;