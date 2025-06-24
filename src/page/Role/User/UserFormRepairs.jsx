import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import pays from '../../../assets/images/repairs.png';

function UserFormRepairs() {
    const [formData, setFormData] = useState({
        room_id: "",
        tenantName: "",
        repairType: "",
        details: "",
        phone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ส่งข้อมูลแจ้งซ่อม:", formData);
        alert("ส่งคำร้องแจ้งซ่อมเรียบร้อยแล้ว!");
    };

    return (
        <div className="container min-vh-100 py-5">
            <motion.div
                className="row g-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
            >
                {/* ซ้าย: รูปภาพ */}
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

                {/* ขวา: ฟอร์ม */}
                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-header bg-secondary text-white text-center py-4 rounded-top-4">
                            <h4 className="mb-0 fw-bold">
                                <FontAwesomeIcon icon={faHome} className="me-2" />
                                แบบฟอร์มแจ้งซ่อม
                            </h4>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="roomNumber" className="form-label fw-semibold">
                                        หมายเลขห้องพัก <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="roomNumber"
                                        name="roomNumber"
                                        placeholder="เช่น 101, 202 (อาคาร A)"
                                        value={formData.roomNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tenantName" className="form-label fw-semibold">
                                        ชื่อผู้แจ้ง <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="tenantName"
                                        name="tenantName"
                                        placeholder="ชื่อ - นามสกุล ผู้เช่า"
                                        value={formData.tenantName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="repairType" className="form-label fw-semibold">
                                        ประเภทการซ่อม <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="form-select form-select-lg"
                                        id="repairType"
                                        name="repairType"
                                        value={formData.repairType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">-- กรุณาเลือกประเภทการซ่อม --</option>
                                        <option value="ไฟฟ้า">ระบบไฟฟ้า 💡</option>
                                        <option value="ประปา">ระบบประปา 💧</option>
                                        <option value="เฟอร์นิเจอร์">เฟอร์นิเจอร์ 🛋️</option>
                                        <option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า 🔌</option>
                                        <option value="สุขภัณฑ์">สุขภัณฑ์ 🚽</option>
                                        <option value="อื่น ๆ">อื่น ๆ (ระบุในรายละเอียด) 🛠️</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="details" className="form-label fw-semibold">
                                        รายละเอียดปัญหา <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        className="form-control form-control-lg"
                                        id="details"
                                        name="details"
                                        placeholder="โปรดอธิบายปัญหาหรือความเสียหายอย่างละเอียด..."
                                        value={formData.details}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="phone" className="form-label fw-semibold">
                                        เบอร์โทรศัพท์ติดต่อกลับ <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control form-control-lg"
                                        id="phone"
                                        name="phone"
                                        placeholder="เช่น 08x-xxxx-xxxx"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                                        required
                                    />
                                    <small className="form-text text-muted">
                                        รูปแบบ: 0xx-xxxx-xxxx หรือ 0xxxxxxxxxx
                                    </small>
                                </div>

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-secondary btn-lg">
                                        ส่งคำร้องแจ้งซ่อม
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center text-muted py-3">
                            <small>จะมีการติดต่อกลับโดยเร็วที่สุดเพื่อดำเนินการซ่อมแซม</small>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default UserFormRepairs;
