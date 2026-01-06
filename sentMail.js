import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "trpkkx@gmail.com",
    pass: "myeo uphp izeq trms", // App password ถูกต้องครับ
  },
});

app.post("/send-email", async (req, res) => {
  const { roomId, roomPrice, waterUnits, electricUnits } = req.body;

  const waterRate = 18;
  const electricRate = 8;

  const waterCharge = waterUnits * waterRate;
  const electricCharge = electricUnits * electricRate;
  const total = roomPrice + waterCharge + electricCharge;

  const mailOptions = {
    from: "trpkkx@gmail.com",
    to: "txrnq.007x@gmail.com",
    subject: `📢 แจ้งสรุปยอดชำระค่าเช่าห้อง ${roomId}`,
    html: ` 
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #007bff; color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0;">สรุปยอดชำระเงิน</h2>
                <p style="margin: 5px 0 0 0;">ห้องพักหมายเลข ${roomId}</p>
            </div>
            <div style="padding: 20px; color: #333;">
                <p>เรียน คุณผู้เช่าห้อง ${roomId},</p>
                <p>ทางหอพักขอแจ้งรายละเอียดค่าใช้จ่ายประจำเดือน ดังนี้ครับ:</p>
                
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 10px 0;">ค่าเช่าห้องพัก</td>
                        <td style="padding: 10px 0; text-align: right;"><b>${roomPrice.toLocaleString()}</b> บาท</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 10px 0;">ค่าน้ำประปา (${waterUnits} หน่วย)</td>
                        <td style="padding: 10px 0; text-align: right;"><b>${waterCharge.toLocaleString()}</b> บาท</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 10px 0;">ค่าไฟฟ้า (${electricUnits} หน่วย)</td>
                        <td style="padding: 10px 0; text-align: right;"><b>${electricCharge.toLocaleString()}</b> บาท</td>
                    </tr>
                    <tr>
                        <td style="padding: 20px 0; font-size: 18px; font-weight: bold;">ยอดรวมทั้งสิ้น</td>
                        <td style="padding: 20px 0; font-size: 20px; font-weight: bold; text-align: right; color: #d9534f;">
                            ${total.toLocaleString()} บาท
                        </td>
                    </tr>
                </table>

                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; font-size: 14px; border-left: 4px solid #007bff;">
                    <p style="margin: 0;"><b>หมายเหตุ:</b> กรุณาชำระเงินและแจ้งสลิปผ่านระบบภายในวันที่กำหนดครับ</p>
                </div>
                
                <p style="margin-top: 25px; font-size: 14px; color: #777;">
                    ขอแสดงความนับถือ<br>
                    ระบบจัดการหอพักอัตโนมัติ
                </p>
            </div>
        </div>
        `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "ส่งเมลสำเร็จ", info });
  } catch (error) {
    console.error("Mail Error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "ส่งเมลไม่สำเร็จ",
        error: error.message,
      });
  }
});

app.listen(3001, () => {
  console.log("🚀 Backend running on http://localhost:3001");
});
