//handle database connections here
import mongoose from "mongoose";
import 'dotenv/config'

const connectDb = async () => {

    mongoose.connection.on('connecting', () => {
        console.log("Connecting to mongodb");
    })
    
    mongoose.connection.on('connected', () => {
        console.log(`Mongo db connected at port ${process.env.MONGO_URI}`);
    })
    
    mongoose.connection.on('error', err => {
        console.log("error after initial connection was established in the mongo db");
    })
    
    mongoose.connection.on('disconnected', err => { 
        console.log("mongo db disconnected");
    })
    
    
    try{
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/project-2');
    } catch(error){
        console.log("connection to mongo db failed");
        console.log(error);
    }

}

export default connectDb;







