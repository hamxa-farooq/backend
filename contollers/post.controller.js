import Post from '../models/postModel.js'

export const getPosts = async (req, res) => {
    console.log("bla bla2");
    try{
        const posts = await Post.find({draft: 0}).sort({_id: -1});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).send({message: err?.message || "internal server error occured"});
    }
    
}



export const addPost = async (req, res) => {
    if(req.body){

        const post = {
            title: req.body.title,
            content: req.body.content,
            userId: req.body.userId,
            draft: 0,
        }
    
        try{
            await Post.create(post);
            res.status(200).send({message: "post saved successfully", post});
        }catch(err){
            res.status(500).send({message: err?.message || "a database error occured"});
        }  
    }else
        res.status(500).send({message: "Invalid Request"});

}



export const updatePost = async (req, res) => {
    if(req.body && req.params?.id)
    {
        const postId = req.params.id;
        const newData = req.body;
        try{
            const oldData = await Post.findByIdAndUpdate({_id: postId}, newData);
            res.status(200).send({message: "data updated successfully", data: oldData});
        }catch(err){
            res.status(500).send({message: err?.message || "a database error occured"});
        }
    }else
        res.status(500).send({message: "Invalid Request"});

    
}



export const deletePost = async (req, res) => {
    if(req.params?.id){
        const postId = req.params.id;

        try{
            const deletedPost = await Post.findByIdAndDelete({_id: postId});
            res.status(200).send({message: "Post deleted successfully", data: deletedPost});
        }catch(err){
            res.status(500).send({message: err?.message || "a database error occured"});
        }
    }else
        res.status(500).send({message: "Invalid Request"});

    
}