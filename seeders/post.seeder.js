import { faker } from '@faker-js/faker'
import connectDb from '../database/connection.js'
import Post from '../models/postModel.js'
import mongoose from 'mongoose'
import 'dotenv/config'

connectDb();

const userIds = ['62df3e4537062a6408a0721c', '62df405137062a6408a0721e', '62df41ab37062a6408a07220', '62df439a37062a6408a07222', '62df459137062a6408a07224', '62df464937062a6408a07228', '62df524f8e77c81c1827f573'];
var dummyPosts = [];

for(let i=0; i<1000; i++){
    let dummyPost = {
        title: faker.lorem.sentence(4),
        body: faker.lorem.paragraph(),
        userId: userIds[ faker.datatype.number({min: 0, max: 6}) ],
        draft: faker.datatype.number({min: 0, max: 1}),
    }
    
    dummyPosts.push(dummyPost);
}

setTimeout(() => {
    const seedDb = async () => {
        console.log("seeding post collection");
        await Post.insertMany(dummyPosts);
    }
    
    seedDb()
    .then(() => {
        mongoose.connection.close();
        console.log("seeding post collection completed")
    })
}, 1000);