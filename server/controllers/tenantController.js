import pool from '../db/db.js';

// GET all 
export const getAllTenants = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tenants ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("GET /tenants error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
