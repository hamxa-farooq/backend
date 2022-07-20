import express from 'express';
const router = express.Router();
import {
  getDrafts,
  addDraft,
  updateDraft,
  deleteDraft,
  deleteAllDrafts,publishDraft,
} from '../contollers';

router.get('/:userId', getDrafts);

router.post('/add', addDraft);

router.put('/:id/update', updateDraft);

router.delete('/:id/delete', deleteDraft);

router.delete('/:userId/delete/all', deleteAllDrafts);

router.post('/:id/publish', publishDraft);

export default router;
