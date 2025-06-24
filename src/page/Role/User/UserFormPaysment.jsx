// UserFormPaysment.tsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { motion } from 'framer-motion';
import pays from '../../../assets/images/pays.png';

const UserFormPaysment = () => {
    const [formData, setFormData] = useState({
        tenantName: '',
        roomNumber: '',
        month: '',
        amount: '',
        paymentMethod: '',
        paymentDate: '',
        slip: null,
        note: '',
    });

    const [slipPreview, setSlipPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "slip") {
            const file = files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) {
                    alert("ไฟล์ขนาดเกิน 5MB");
                    return;
                }
                setSlipPreview(URL.createObjectURL(file));
                setFormData({ ...formData, [name]: file });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        try {
            await axios.post('/api/payments', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('ส่งข้อมูลการชำระเงินเรียบร้อยแล้ว!');
        } catch (error) {
            console.error('เกิดข้อผิดพลาด:', error);
            alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
        }
    };

    return (
        <div className="container d-flex ">
            <motion.div
                className="row g-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
            >
                {/* ภาพตัวอย่างสลิป */}
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 h-100">
                        <img
                            src={pays}
                            alt="Payslip Example"
                            className="img-fluid w-100 h-100 object-fit-cover"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>

                {/* ฟอร์มแจ้งชำระเงิน */}
                <div className="col-lg-4">
                    <div className="card shadow-lg border-0 rounded-lg h-100">
                        <div className="card-header bg-secondary text-white text-center py-2">
                            <h5 className="mb-0">แบบฟอร์มการแจ้งชำระเงิน</h5>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <fieldset className="mb-4 p-3 border rounded-3">
                                    <legend className="float-none w-auto px-2 fs-5">ข้อมูลผู้เช่า</legend>
                                    <div className="mb-3">
                                        <label htmlFor="tenantName" className="form-label">ชื่อ-นามสกุล ผู้เช่า</label>
                                        <input type="text" className="form-control" id="tenantName" name="tenantName" onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="roomNumber" className="form-label">หมายเลขห้อง</label>
                                        <input type="text" className="form-control" id="roomNumber" name="roomNumber" onChange={handleChange} required />
                                    </div>
                                </fieldset>

                                <fieldset className="mb-3 p-3 border rounded-3">
                                    <legend className="float-none w-auto px-2 fs-5">รายละเอียดการชำระเงิน</legend>

                                    <div className="row mb-3">
                                        <div className="col-md-6 mb-3 mb-md-0">
                                            <label htmlFor="month" className="form-label">ประจำเดือน</label>
                                            <select className="form-select" id="month" name="month" onChange={handleChange} required>
                                                <option value="">-- เลือกเดือน --</option>
                                                {[
                                                    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
                                                    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
                                                ].map((m, i) => (
                                                    <option key={i} value={m}>{m}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="amount" className="form-label">จำนวนเงิน (บาท)</label>
                                            <input type="number" className="form-control" id="amount" name="amount" onChange={handleChange} required min="0" />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6 mb-3 mb-md-0">
                                            <label htmlFor="paymentMethod" className="form-label">วิธีการชำระ</label>
                                            <select className="form-select" id="paymentMethod" name="paymentMethod" onChange={handleChange} required>
                                                <option value="">-- เลือกวิธี --</option>
                                                <option value="โอนเงิน">โอนเงิน</option>
                                                <option value="เงินสด">เงินสด</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="paymentDate" className="form-label">วันที่ชำระ</label>
                                            <input type="date" className="form-control" id="paymentDate" name="paymentDate" onChange={handleChange} required />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="slip" className="form-label">แนบหลักฐานการชำระ</label>
                                        <input type="file" className="form-control" id="slip" name="slip" accept="image/*" onChange={handleChange} required />
                                        <div className="form-text">รองรับ JPG, PNG ขนาดไม่เกิน 5MB</div>
                                        {slipPreview && (
                                            <div className="mt-2">
                                                <img src={slipPreview} alt="Slip Preview" className="img-fluid rounded border" style={{ maxHeight: '200px' }} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="note" className="form-label">หมายเหตุ</label>
                                        <textarea className="form-control" id="note" name="note" rows="3" onChange={handleChange} placeholder='หมายเหตุ สแกนที่แคชเชียร์ พิมพ์ "ชำระแล้ว"' ></textarea>
                                    </div>
                                </fieldset>

                                <button type="submit" className="btn btn-secondary w-100 py-2 mt-2 fw-bold">
                                    <i className="bi bi-check-circle me-2"></i>ยืนยันการชำระเงิน
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default UserFormPaysment;
