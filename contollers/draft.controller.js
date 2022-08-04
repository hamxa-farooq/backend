import Post from '../models/postModel.js';


export const deleteAllDrafts = async (req, res, next) => {
  
  try {
    await Post.deleteMany({ userId: req.params.userId });
    res.status(200).send({ message: 'all drafts deleted successfully' });
  } catch (err) {
    err.type = 'database';
    next(err);
  }
  
};

export const publishDraft = async (req, res) => {
  const draftId = req.params.id;
    const newData = {draft: false};
    try{
        const oldData = await Post.findByIdAndUpdate({_id: draftId}, newData);
        res.status(201).send({message: "data updated successfully", data: oldData});
    }catch(err){
        err.type = 'database';
        next(err);
    }
};
