import pool from '../db/db.js';

export const getRepairs = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM repairs ORDER BY requested_at DESC`);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching repairs:', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลการซ่อม' });
  }
};

export const createRepair = async (req, res) => {
  const {
    room_number,
    tenant_name,
    title,
    description,
    requested_at,
    status,
    phone
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO repairs (room_number, tenant_name, title, description, phone, requested_at, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        room_number,
        tenant_name,
        title,
        description,
        phone,
        requested_at || new Date(), // ใช้วันเวลาปัจจุบันถ้าไม่ได้ส่งมา
        status || 'รอดำเนินการ'
      ]
    );

    res.status(201).json({ message: 'แจ้งซ่อมสำเร็จ', data: result.rows[0] });
  } catch (err) {
    console.error('Error creating repair:', err);
    res.status(500).json({ message: 'ไม่สามารถแจ้งซ่อมได้' });
  }
};


export const updateRepairs = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      "UPDATE repairs SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "ไม่พบรายการแจ้งซ่อม" });
    }

    res.json({ message: "อัปเดตสถานะเรียบร้อย", data: result.rows[0] });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "ไม่สามารถอัปเดตสถานะได้" });
  }
};
