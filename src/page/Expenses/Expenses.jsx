import React, { useState } from 'react';
import Sidebar from '../../components/Navbar/sidebar';
import '../../components/css/Expenses.css';
import { motion } from 'framer-motion';
function Expenses() {
    const rooms = [
        { id: 'A101', price: 4500, },
        { id: 'A102', price: 4800, },
        { id: 'A103', price: 5000, },
        { id: 'A104', price: 4700, },
        { id: 'B101', price: 4500, },
        { id: 'B102', price: 4800, },
        { id: 'B103', price: 5000, },
        { id: 'B104', price: 4700, },
    ];

    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [roomPrice, setRoomPrice] = useState(0);
    const [waterUnits, setWaterUnits] = useState(0);
    const [electricUnits, setElectricUnits] = useState(0);

    const waterRate = 18;
    const electricRate = 8;

    const handleRoomChange = (e) => {
        const roomId = e.target.value;
        setSelectedRoomId(roomId);
        const selectedRoom = rooms.find(room => room.id === roomId);
        if (selectedRoom) {
            setRoomPrice(selectedRoom.price);
        } else {
            setRoomPrice(0);
        }
    };

    const { waterCharge, electricCharge, total } = calculateTotal(
        Number(roomPrice),
        Number(waterUnits),
        waterRate,
        Number(electricUnits),
        electricRate
    );

   const handleSubmit = async () => {
    if (!selectedRoomId) {
        alert('กรุณาเลือกห้อง');
        return;
    }

    const payload = {
        roomId: selectedRoomId,
        roomPrice,
        waterUnits: Number(waterUnits),
        electricUnits: Number(electricUnits),
    };

    console.log('Sending payload:', payload);

    try {
        const response = await fetch('http://localhost:3001/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log('Response from server:', data);

        if (response.ok) {
            alert('✅ ส่งบิลเรียบร้อยแล้ว ');
        } else {
            alert('ส่งอีเมลไม่สำเร็จ: ' + data.message);
        }
    } catch (error) {
        alert('เกิดข้อผิดพลาด: ' + error.message);
        console.error('Fetch error:', error);
    }
};


    return (
        <div style={{ marginTop: '300px', marginLeft: '300px' }}>
            <Sidebar />

            <motion.div
                className="flex-grow-1 d-flex flex-column justify-content-center "
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
            >

                <div className="mt-5 d-flex justify-content-center ">
                    <div className="expenses-card bg-white border rounded" style={{ maxWidth: '800px', width: '100%' }}>
                        <div className="expenses-header text-center">
                            <h4>คำนวณบิลรายเดือน</h4>
                        </div>
                        <div className="card-body p-4">
                            <form className="row g-3" onSubmit={e => e.preventDefault()}>
                                <div className="col-md-4">
                                    <label className="form-label expenses-label">เลือกห้อง</label>
                                    <select className="form-select" value={selectedRoomId} onChange={handleRoomChange}>
                                        <option value="">-- เลือกห้อง --</option>
                                        {rooms.map(room => (
                                            <option key={room.id} value={room.id}>
                                                {room.id} - {room.price.toLocaleString()} บาท
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label expenses-label">หน่วยน้ำ</label>
                                    <input
                                        type="number"
                                        className="form-control no-spinner"
                                        onChange={e => setWaterUnits(Number(e.target.value))}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label expenses-label">หน่วยไฟฟ้า</label>
                                    <input
                                        type="number"
                                        className="form-control no-spinner"
                                        onChange={e => setElectricUnits(Number(e.target.value))}
                                    />
                                </div>
                            </form>

                            <hr />

                            <div className="mt-4 expenses-summary">
                                <p><strong>ค่าห้อง:</strong> {roomPrice.toLocaleString()} บาท</p>
                                <p><strong>ค่าน้ำ:</strong> {waterCharge.toLocaleString()} บาท</p>
                                <p><strong>ค่าไฟ:</strong> {electricCharge.toLocaleString()} บาท</p>
                                <p className="expenses-total">รวมทั้งหมด: {total.toLocaleString()} บาท</p>
                            </div>

                            <div className="text-center mt-4">
                                <button
                                    className="expenses-button"
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    ส่งข้อมูล
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}

const calculateTotal = (roomPrice, waterUnits, waterRate, electricUnits, electricRate) => {
    const waterCharge = waterUnits * waterRate;
    const electricCharge = electricUnits * electricRate;
    const total = roomPrice + waterCharge + electricCharge;
    return {
        waterCharge,
        electricCharge,
        total,
    };
};

export default Expenses;
