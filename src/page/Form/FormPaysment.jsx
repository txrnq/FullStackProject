import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../components/css/FormPaysment.css';
import axios from '../../utils/axiosInstance';
import Sidebar from '../../components/Navbar/sidebar';

import { motion } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

const FormPaysment = () => {
    const [formData, setFormData] = useState({
        tenantName: '',
        roomNumber: '',
        billing_month: '',
        amount: '',
        payment_method: '',
        paid_at: '',
        slip: '',
        note: '',
    });

    const [slipPreview, setSlipPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        
        console.log(
            name,
            value,
            files,
            type
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        console.log('paid_at value:', formData.paid_at);


        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        try {
            await axios.post('/api/payments', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('ส่งข้อมูลการชำระเงินเรียบร้อยแล้ว!');
            setFormData({
                tenantName: '',
                roomNumber: '',
                billing_month: '',
                amount: '',
                payment_method: '',
                paid_at: '',
                slip: null,
                note: '',
            });
            setSlipPreview(null);
        } catch (error) {
            console.error('เกิดข้อผิดพลาด:', error);
            alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
        }
    };

    return (
        <div className="d-flex flex-column flex-md-row min-vh-100">
            {/* Sidebar - Fix width */}
            <div style={{ width: '350px' }} className="d-none d-xl-block">
                <Sidebar />
            </div>

            {/* Content Area */}
            <motion.div
                className="flex-grow-1 d-flex flex-column justify-content-center px-3 px-md-5 py-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
            >
                <div className="container-fluid">
                    <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-header bg-secondary text-white text-center py-2 rounded-top-lg">
                            <h3 className="mb-0">
                                <FontAwesomeIcon icon={faDollarSign} className="me-3" />
                                หน้าบันทึกการชำระเงินค่าเช่า
                            </h3>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                {/* ข้อมูลผู้เช่า */}
                                <fieldset className="mb-4 p-3 border rounded-3">
                                    <legend className="float-none w-auto px-2 fs-5">ข้อมูลผู้เช่า</legend>
                                    <div className="mb-3">
                                        <label htmlFor="tenantName" className="form-label">
                                            <i className="bi bi-person-fill me-2"></i>ชื่อ-นามสกุล ผู้เช่า
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="tenantName"
                                            name="tenantName"
                                            value={formData.tenantName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="roomNumber" className="form-label">
                                            <i className="bi bi-door-open-fill me-2"></i>หมายเลขห้อง
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="roomNumber"
                                            name="roomNumber"
                                            value={formData.roomNumber}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </fieldset>

                                {/* รายละเอียดการชำระเงิน */}
                                <fieldset className="mb-2 p-3 border rounded-3">
                                    <legend className="float-none w-auto px-2 fs-5">รายละเอียดการชำระเงิน</legend>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="billing_month" className="form-label">
                                                <i className="bi bi-calendar-check-fill me-2"></i>ประจำเดือน
                                            </label>
                                            <select
                                                className="form-select"
                                                id="billing_month"
                                                name="billing_month"
                                                value={formData.billing_month}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="billing_month">-- เลือกเดือนที่ชำระ --</option>
                                                {[
                                                    'มกราคม',
                                                    'กุมภาพันธ์',
                                                    'มีนาคม',
                                                    'เมษายน',
                                                    'พฤษภาคม',
                                                    'มิถุนายน',
                                                    'กรกฎาคม',
                                                    'สิงหาคม',
                                                    'กันยายน',
                                                    'ตุลาคม',
                                                    'พฤศจิกายน',
                                                    'ธันวาคม',
                                                ].map((m, i) => (
                                                    <option key={i} value={m}>
                                                        {m}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="amount" className="form-label">
                                                <i className="bi bi-currency-dollar me-2"></i>จำนวนเงินค่าเช่า (บาท)
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="amount"
                                                name="amount"
                                                value={formData.amount}
                                                onChange={handleChange}
                                                required
                                                min="0"
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="payment_method" className="form-label">
                                                <i className="bi bi-credit-card-2-back-fill me-2"></i>วิธีการชำระเงิน
                                            </label>
                                            <select
                                                className="form-select"
                                                id="payment_method"
                                                name="payment_method"
                                                value={formData.payment_method}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">-- เลือกช่องทางการชำระเงิน --</option>
                                                <option value="โอนเงิน">Qr_payment</option>
                                                <option value="เงินสด">เงินสด</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="paid_at" className="form-label">
                                                <i className="bi bi-calendar-date-fill me-2"></i>วันที่ชำระเงิน
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="paid_at"
                                                name="paid_at"
                                                value={formData.paid_at}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="slip" className="form-label">
                                            <i className="bi bi-image-fill me-2"></i>แนบหลักฐานการชำระเงิน
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="slip"
                                            name="slip"
                                            accept="image/*"
                                            onChange={handleChange}
                                            required
                                        />
                                        <div className="form-text">เฉพาะไฟล์รูปภาพ (JPG, PNG) ขนาดไม่เกิน 5MB</div>

                                        {slipPreview && (
                                            <div className="mt-2">
                                                <img
                                                    src={slipPreview}
                                                    alt="Preview"
                                                    className="img-fluid rounded border"
                                                    style={{ maxHeight: '200px' }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="note" className="form-label">
                                            <i className="bi bi-chat-dots-fill me-2"></i>หมายเหตุ
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="note"
                                            name="note"
                                            value={formData.note}
                                            onChange={handleChange}
                                            rows="3"
                                        />
                                    </div>
                                </fieldset>

                                <button type="submit" className="btn btn-secondary w-100 py-2 mt-3 fw-bold">
                                    <i className="bi bi-check-circle-fill me-2"></i>ยืนยันการชำระเงิน
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FormPaysment;
