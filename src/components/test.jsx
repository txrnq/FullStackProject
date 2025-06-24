import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Testpage() {
    // ตัวแปรจำลอง
    const roomId = 101;
    const roomPrice = 3500;
    const total = 3900; // เช่น ค่าน้ำค่าไฟรวม

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card shadow p-4">
                <h3 className="mb-3">รายละเอียดบิลห้อง {roomId}</h3>
                <p>ค่าห้อง: {roomPrice} บาท</p>
                <p>รวม: {total} บาท</p>
            </div>
        </div>
    );
}

export default Testpage;
