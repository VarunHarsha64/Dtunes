import songModel from '../models/songModel.js';
import albumModel from '../models/playlistModel.js';
import userModel from '../models/userModel.js';

export const searchSongs = async (query) => {
    try {
        const songs = await songModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { artist: { $regex: query, $options: 'i' } },
            ],
        });
        return songs;
    } catch (error) {
        console.error('Error searching songs:', error);
        throw error;
    }
};

export const searchPlaylists = async (query) => {
    try {
        const playlists = await albumModel.find({
            name: { $regex: query, $options: 'i' },
        });
        return playlists;
    } catch (error) {
        console.error('Error searching playlists:', error);
        throw error;
    }
};

export const searchUsers = async (query) => {
    try {
        const users = await userModel.find({
            name: { $regex: query, $options: 'i' },
        });
        return users;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
};