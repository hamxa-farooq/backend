import Post from '../models/postModel.js'

export const getPosts = async (req, res, next) => {
    if(req.query.option === 'posts'){
        try{
            const posts = await Post.find({draft: 0})?.sort({updatedAt: -1});
            res.status(200).json(posts);
        }catch(err){
            err.type = 'database';
            next(err);
        }
    }
    else if(req.query.option === 'drafts'){
        try{
            const drafts = await Post.find({draft: 1, userId: req.params.userId})?.sort({updatedAt: -1});
            res.status(200).json(drafts);
        }catch(err){
            err.type = 'database';
            next(err);
        }
    }
    else
        res.status(204).send({message: 'No content available for this request'});
    
     
}



export const addPost = async (req, res, next) => {

    const post = {
        title: req.body.title,
        body: req.body.body,
        userId: req.body.userId,
        draft: false,
    }
    try{
        const addedPost = await Post.create(post);
        res.status(201).send({message: "post saved successfully", addedPost });
    }catch(err){
        err.type = 'database';
        next(err);
    }

}



export const updatePost = async (req, res, next) => {
  
    const postId = req.params.id;
    const newData = req.body;
    try{
        const oldData = await Post.findByIdAndUpdate({_id: postId}, newData);
        res.status(200).send({message: "data updated successfully", data: oldData});
    }catch(err){
        err.type = 'database';
        next(err);
    }
}



export const deletePost = async (req, res, next) => {
    console.log('in delete post');
  const postId = req.params.id;

  try {
    const deletedPost = await Post.findByIdAndDelete({ _id: postId });

    res.status(200).send({ message: 'Post deleted successfully', data: deletedPost });


  } catch (err) {
    err.type = 'database';
    next(err);
  }
};