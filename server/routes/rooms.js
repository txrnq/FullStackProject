const express = require('express');
const router = express.Router();
const { default: pool } = require('../db/db');


// GET: ห้องทั้งหมด
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rooms ORDER BY room_id ASC');
        const rooms = result.rows.map((room) => ({
            id: room.room_number,
            status: room.room_status,
            price: room.room_price,
            size: room.room_size,
            depositMonths: room.deposit_months,
            image: room.image_url || 'https://source.unsplash.com/400x300/?room', // ใช้รูปจาก DB หรือ default
        }));
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET: ห้องตาม id
// router.get('/rooms/:id', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM rooms WHERE room_number = $1', [req.params.id]);
//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: 'Room not found' });
//         }

//         const room = result.rows[0];
//         const response = {
//             id: room.room_number,
//             status: room.room_status,
//             price: room.room_price,
//             size: room.room_size,
//             depositMonths: room.deposit_months,

//         };

//         res.json(response);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

module.exports = router;
