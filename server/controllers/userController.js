import pool from '../db/db.js';

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("GET /users error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
// DELETE a user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ต้องการลบ' });
    }
    res.status(200).json({ message: 'ลบข้อมูลสำเร็จ' });
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบข้อมูล' });
  }
};

// POST create a new user
export const addUser = async (req, res) => {
  try {
    const {
      username,
      password_hash,
      full_name,
      email,
      phone,
      role,
      status = 'active' // ตั้งค่า default ถ้าไม่ส่งมา
    } = req.body;

    // Basic Validation
    if (!username || !password_hash || !full_name || !email || !phone || !role) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    // เช็คว่า username หรือ email ซ้ำหรือไม่ (optional, แนะนำ)
    const duplicateCheck = await pool.query(
      `SELECT * FROM users WHERE username = $1 OR email = $2`,
      [username, email]
    );
    if (duplicateCheck.rows.length > 0) {
      return res.status(409).json({ message: 'ชื่อผู้ใช้หรืออีเมลนี้มีอยู่ในระบบแล้ว' });
    }

    // บันทึกลงฐานข้อมูล
    const result = await pool.query(
      `INSERT INTO users (username, password_hash, full_name, email, phone, role, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [username, password_hash, full_name, email, phone, role, status]
    );

    res.status(201).json({
      message: '✅ เพิ่มผู้ใช้เรียบร้อย',
      user: result.rows[0]
    });

  } catch (err) {
    console.error('❌ Error adding user:', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มผู้ใช้' });
  }
};
