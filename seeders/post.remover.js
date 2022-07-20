import connectDb from '../database/connection.js'
import Post from '../models/postModel.js'
import mongoose from 'mongoose'
import 'dotenv/config'

connectDb();

setTimeout(() => {
    const seedDb = async () => {
        console.log("deleting all posts from post collection");
        await Post.deleteMany({});
    }
    
    seedDb()
    .then(() => {
        mongoose.connection.close();
        console.log("all posts from post collection deleted");
    })
}, 1000);