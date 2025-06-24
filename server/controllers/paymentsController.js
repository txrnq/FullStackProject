// controllers/paymentController.js
import pool from '../db/db.js';


export const getPayments = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT payments.*, users.full_name AS tenant_name, rooms.room_number
      FROM payments
      LEFT JOIN users ON users.id = payments.tenant_id
      LEFT JOIN rooms ON rooms.room_id = payments.room_id
      ORDER BY payments.paid_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
  }
};

export const createPayment = async (req, res) => {
  try {
    console.log('Received payment data:', req.body);

    const {
      tenantName,
      roomNumber,
      billing_month: billingMonthInput, // เช่น "มิถุนายน"
      amount,
      payment_method,
      paid_at, // เช่น "18 มิถุนายน 2025"
      note,
    } = req.body;

    const monthMap = {
      "มกราคม": "01",
      "กุมภาพันธ์": "02",
      "มีนาคม": "03",
      "เมษายน": "04",
      "พฤษภาคม": "05",
      "มิถุนายน": "06",
      "กรกฎาคม": "07",
      "สิงหาคม": "08",
      "กันยายน": "09",
      "ตุลาคม": "10",
      "พฤศจิกายน": "11",
      "ธันวาคม": "12"
    };

    // ✅ แปลง billing_month เป็นเลขเดือน
    let billing_month = null;
    if (billingMonthInput) {
      const monthThai = billingMonthInput.trim();
      const monthNum = monthMap[monthThai];

      if (!monthNum) {
        return res.status(400).json({ message: 'ชื่อเดือนไม่ถูกต้อง' });
      }

      billing_month = monthNum;
    }

    // ✅ แปลง paid_at เช่น "18 มิถุนายน 2025" → "2025-06-18"
    // let parsedPaidAt = null;
    // if (paid_at) {
    //   const [day, thaiMonth, year] = paid_at.trim().split(' ');
    //   const monthNum = monthMap[thaiMonth];
    //   if (day && monthNum && year) {
    //     parsedPaidAt = `${year}-${monthNum}-${day.padStart(2, '0')}`;
    //   } else {
    //     return res.status(400).json({ message: 'รูปแบบวันที่ชำระไม่ถูกต้อง' });
    //   }
    // }

    const slipPath = req.file ? req.file.path : null;
    console.log('Uploaded slip path:', slipPath);

    // 🔍 ดึง tenant_id และ room_id
    const tenantQuery = await pool.query(
      `SELECT id FROM users WHERE full_name = $1 LIMIT 1`, [tenantName]
    );
    const roomQuery = await pool.query(
      `SELECT room_id FROM rooms WHERE room_number = $1 LIMIT 1`, [roomNumber]
    );

    const tenant_id = tenantQuery.rows[0]?.id;
    const room_id = roomQuery.rows[0]?.room_id;

    if (!tenant_id || !room_id) {
      return res.status(400).json({ message: 'ไม่พบข้อมูลผู้เช่าหรือห้อง' });
    }

    const insertQuery = `
  INSERT INTO payments (
    tenant_id, room_id, billing_month, amount, payment_method,
    paid_at, payment_status, slip, note
  )
  VALUES ($1, $2, $3, $4, $5, $6, 'unpaid', $7, $8)
  RETURNING *
`;

    const result = await pool.query(insertQuery, [
      tenant_id, room_id, billing_month, amount, payment_method,
      paid_at, // ใช้วันที่แปลงแล้ว
      slipPath,     // ใช้ path ที่ multer เก็บไฟล์
      note
    ]);


    res.status(201).json({
      message: '✅ บันทึกการชำระเงินเรียบร้อย',
      data: result.rows[0]
    });

  } catch (err) {
    console.error('❌ Error saving payment:', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
  }
};
