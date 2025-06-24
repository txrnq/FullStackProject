import express from 'express';
import { getRepairs, createRepair, updateRepairs } from '../controllers/repairController.js';

const router = express.Router();

router.get('/', getRepairs);
router.post('/', createRepair);
router.patch('/:id', updateRepairs);

export default router;
