// const express = require("express");
// const router = express.Router();
// const userController = require("../controllers/userController");

// 
// router.post("/", userController.createUser);

// module.exports = router;


// server/routes/users.js
import express from 'express';
import {getAllUsers, addUser, deleteUser} from '../controllers/userController.js';

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", addUser);
router.delete("/:id", deleteUser);

// // GET all users
// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

export default router;
