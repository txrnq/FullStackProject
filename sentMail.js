import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// สำหรับ __dirname (ใน ES module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'trpkkx@gmail.com',
        pass: 'myeo uphp izeq trms', // App password
    },
});

app.post('/send-email', async (req, res) => {
    const { roomId, roomPrice, waterUnits, electricUnits } = req.body;

    const waterRate = 18;
    const electricRate = 8;

    const waterCharge = waterUnits * waterRate;
    const electricCharge = electricUnits * electricRate;
    const total = roomPrice + waterCharge + electricCharge;

    const mailOptions = {
        from: 'trpkkx@gmail.com',
        to: 'txrnq.007x@gmail.com',
        subject: `แจ้งเตือนบิล ห้อง ${roomId}`,
        html: ` 
            
            <h3 className="mb-3 ">รายละเอียดบิลห้อง ${roomId}</h3>
            
            <p>ค่าน้ำ: ${waterCharge} บาท</p>
            <p>ค่าไฟ: ${electricCharge} บาท</p>
            <p>ค่าห้อง: ${roomPrice} บาท</p>
            <p>รวม: ${total} บาท</p>
        `
        ,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.json({ message: 'ส่งเมลสำเร็จ', info });
    } catch (error) {
        res.status(500).json({ message: 'ส่งเมลไม่สำเร็จ', error });
    }
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
