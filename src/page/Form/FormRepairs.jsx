import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Sidebar from "../../components/Navbar/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const FormRepairs = () => {
  const [formData, setFormData] = useState({
    room_number: "",
    tenant_name: "",
    title: "",
    description: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/repairs", {
        room_number: formData.room_number,
        tenant_name: formData.tenant_name,
        title: formData.title,
        description: formData.description,
        phone: formData.phone,
        requested_at: new Date().toISOString(), // เพิ่มเวลาปัจจุบัน
      });

      alert("ส่งคำร้องแจ้งซ่อมเรียบร้อยแล้ว!");
      setFormData({
        room_number: "",
        tenant_name: "",
        title: "",
        description: "",
        phone: "",
      });
    } catch (error) {
      console.error("ส่งคำร้องผิดพลาด:", error);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex min-vh-100">
      <div className="d-none d-xl-block" style={{ width: "350px" }}>
        <Sidebar />
      </div>

      <motion.div
        className="flex-grow-1 d-flex flex-column justify-content-center p-4 p-md-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container-fluid">
          <div className="card shadow-lg border-0 rounded-4 mx-auto">
            <div className="card-header bg-secondary text-white text-center py-4 rounded-top-4">
              <h4 className="mb-0 fw-bold">
                <FontAwesomeIcon icon={faHome} className="me-3" />
                แบบฟอร์มแจ้งซ่อม
              </h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="room_number" className="form-label fw-semibold">
                    หมายเลขห้องพัก <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="room_number"
                    name="room_number"
                    placeholder="เช่น A101, A202 (อาคาร A)"
                    value={formData.room_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="tenant_name" className="form-label fw-semibold">
                    ชื่อผู้แจ้ง <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="tenant_name"
                    name="tenant_name"
                    placeholder="ชื่อ - นามสกุล ผู้เช่า"
                    value={formData.tenant_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-semibold">
                    ประเภทการซ่อม <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select form-select-lg"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- กรุณาเลือกประเภทการซ่อม --</option>
                    <option value="ไฟฟ้า">ระบบไฟฟ้า</option>
                    <option value="ประปา">ระบบประปา</option>
                    <option value="เฟอร์นิเจอร์">เฟอร์นิเจอร์</option>
                    <option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</option>
                    <option value="สุขภัณฑ์">สุขภัณฑ์</option>
                    <option value="อื่น ๆ">อื่น ๆ</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-semibold">
                    รายละเอียดปัญหา <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control form-control-lg"
                    id="description"
                    name="description"
                    placeholder="โปรดอธิบายปัญหาหรือความเสียหายอย่างละเอียด..."
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
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
                  <button
                    type="submit"
                    className="btn btn-secondary btn-lg"
                    disabled={loading}
                  >
                    <i className="bi bi-send-fill me-2"></i>
                    {loading ? "กำลังส่ง..." : "ส่งคำร้องแจ้งซ่อม"}
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
};

export default FormRepairs;
