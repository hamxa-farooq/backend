import Post from '../models/postModel.js';

export const getDrafts = async (req, res) => {
  try {
    const drafts = await Post.find({ draft: 1, userId: req.params.userId }).sort({ _id: -1 });
    res.status(200).json(drafts);
  } catch (err) {
    res.status(500).send({ message: err?.message || 'a database error occured' });
  }
};

export const addDraft = async (req, res) => {
  if (req.body) {
    const draft = {
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
      draft: 1,
    };
    try {
      await Post.create(draft);
      res.status(200).send({ message: 'draft saved successfully', draft });
    } catch (err) {
      res.status(500).send({ message: err?.message || 'a database error occured' });
    }
  } else res.status(500).send({ message: 'Invalid Request' });
};

export const updateDraft = async (req, res) => {
  if (req.body && req.params?.id) {
    const draftId = req.params.id;
    const newData = req.body;
    try {
      const oldData = await Post.findByIdAndUpdate({ _id: draftId }, newData);
      res.status(200).send({ message: 'data updated successfully', data: oldData });
    } catch (err) {
      res.status(500).send({ message: err?.message || 'a database error occured' });
    }
  } else res.status(500).send({ message: 'Invalid Request' });
};

export const deleteDraft = async (req, res) => {
  if (req.params?.id) {
    const draftId = req.params.id;

    try {
      const deletedDraft = await Post.findByIdAndDelete({ _id: draftId });
      res.status(200).send({ message: 'draft deleted successfully', data: deletedDraft });
    } catch (err) {
      res.status(500).send({ message: err?.message || 'a database error occured' });
    }
  } else res.status(500).send({ message: 'Invalid Request' });
};

export const deleteAllDrafts = async (req, res) => {
  if (req.params?.userId) {
    try {
      await Post.deleteMany({ userId: req.params.userId });
      res.status(200).send({ message: 'all drafts deleted successfully' });
    } catch (err) {
      res.status(500).send({ message: err?.message || 'a database error occured' });
    }
  } else {
    res.status(500).send({ message: 'Invalid Request' });
  }
};

export const publishDraft = async (req, res) => {
  console.log('entered route');
  if (req.params?.id) {
    const draftId = req.params.id;

    const deletedDraft = await Post.findByIdAndDelete({ _id: draftId });
    console.log(deletedDraft);
  }
};
