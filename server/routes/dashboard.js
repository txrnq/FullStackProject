const express = require('express');
const router = express.Router();
const { default: pool } = require('../db/db');

// GET /dashboard/stats
router.get('/stats', async (req, res) => {
    try {
        const [
            rentedRoomsRes,
            totalTenantsRes,
            paidTenantsRes
        ] = await Promise.all([
            pool.query("SELECT COUNT(*) FROM rooms WHERE room_status = 'rented'"),
            pool.query("SELECT COUNT(*) FROM users WHERE role = 'tenant'"),
            pool.query(`
                SELECT COUNT(DISTINCT tenant_id) 
                FROM payments 
                WHERE payment_status = 'paid' 
                  AND EXTRACT(MONTH FROM paid_at) = EXTRACT(MONTH FROM CURRENT_DATE)
                  AND EXTRACT(YEAR FROM paid_at) = EXTRACT(YEAR FROM CURRENT_DATE)
            `)
        ]);

        const rentedRooms = parseInt(rentedRoomsRes?.rows?.[0]?.count || "0");
        const totalTenants = parseInt(totalTenantsRes?.rows?.[0]?.count || "0");
        const paidTenants = parseInt(paidTenantsRes?.rows?.[0]?.count || "0");

        const unpaidTenants = Math.max(0, rentedRooms - paidTenants);

        res.json({
            rentedRooms,
            totalTenants,
            paidTenants,
            unpaidTenants
        });

    } catch (err) {
        console.error('❌ Error loading dashboard stats:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
