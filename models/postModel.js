import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    draft:{
        type: Boolean,
        required: true,
    }
},{
    bufferCommands: false,
    autoCreate: false,
    timestamps: true,
})

const postModel = mongoose.model('Post', postSchema);

export default postModel;