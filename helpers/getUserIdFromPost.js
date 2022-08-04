import Post from "../models/postModel.js"

const getUserIdFromPost = async (postId) => {
    console.log('in helper');
    const post = await Post.find({_id: postId});
    console.log(post.userId);
    return post;
}

export default getUserIdFromPost;