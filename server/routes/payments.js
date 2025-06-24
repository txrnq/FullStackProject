// routes/paymentRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { getPayments, createPayment } from '../controllers/paymentsController.js';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 ตั้งค่าอัปโหลด
const   storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/slips');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// 🔗 Routes
router.get('/', getPayments);
router.post('/', upload.single('slip'), createPayment);

export default router;
