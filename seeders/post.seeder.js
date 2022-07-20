import { faker } from '@faker-js/faker'
import connectDb from '../database/connection.js'
import Post from '../models/postModel.js'
import mongoose from 'mongoose'
import 'dotenv/config'

connectDb();

const userIds = ['62d65a280047e05a9e29c46b', '62d65a390047e05a9e29c46d', '62d65a410047e05a9e29c46f', '62d65a4d0047e05a9e29c471', '62d65a710047e05a9e29c473'];
var dummyPosts = [];

for(let i=0; i<200; i++){
    let dummyPost = {
        title: faker.lorem.sentence(4),
        content: faker.lorem.paragraph(),
        userId: userIds[ faker.datatype.number({min: 0, max: 4}) ],
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