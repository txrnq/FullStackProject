import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "../../components/css/Form.css";

const ComponentTest = () => {
  const [formData, setFormData] = useState({
    roomNumber: "", // ปรับชื่อให้ตรงกับ name ใน input
    tenantName: "",
    title: "",
    description: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // connect to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/repairs", {
        room_number: formData.roomNumber,
        tenant_name: formData.tenantName,
        title: formData.title,
        description: formData.description,
        phone: formData.phone,
        requested_at: new Date().toISOString(),
      });

      alert("ส่งคำร้องแจ้งซ่อมเรียบร้อยแล้ว!");
      setFormData({
        roomNumber: "",
        tenantName: "",
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
    <div
      className="container mt-5 pb-5 main-content-wrapper"
      style={{ paddingLeft: "280px" }}
    >
      <h1 className="text-center mb-5">
        <FontAwesomeIcon icon={faHome} className="me-3" />
        แบบฟอร์มแจ้งซ่อม
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* Input: ชื่อผู้เช่า */}
          <div className="form-floating mb-3 custom-floating is-fixed">
            <input
              type="text"
              className="form-control ps-4 border border-secondary"
              id="tenantName"
              name="tenantName"
              placeholder=" "
              value={formData.tenantName}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="tenantName"
              className="border border-secondary px-3"
            >
              ชื่อ-นามสกุล ผู้เช่า <span className="text-danger">*</span>
            </label>
          </div>

          {/* Input: หมายเลขห้อง */}
          <div className="form-floating mb-3 custom-floating is-fixed">
            <input
              type="text"
              className="form-control ps-4 border border-secondary"
              id="roomNumber"
              name="roomNumber"
              placeholder=" "
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="roomNumber"
              className="border border-secondary px-3"
            >
              หมายเลขห้อง <span className="text-danger">*</span>
            </label>
          </div>

          {/* แก้ไขส่วนนี้: เบอร์โทรศัพท์ให้เป็น Floating Label */}
          <div className="form-floating mb-3 custom-floating is-fixed">
            <input
              type="tel"
              className="form-control ps-4 border border-secondary"
              id="phone"
              name="phone"
              placeholder=" "
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
              required
            />
            <label htmlFor="phone" className="border border-secondary px-3">
              เบอร์โทรศัพท์ติดต่อกลับ <span className="text-danger">*</span>
            </label>
            <small className="form-text text-muted ms-2">
              รูปแบบ: 0xx-xxxx-xxxx หรือ 0xxxxxxxxxx
            </small>
          </div>
        </div>

        <fieldset className="mb-4 p-3 border border-secondary rounded-3">
          <legend className="float-none w-auto px-2 fs-5 fw-bold text-secondary">
            รายละเอียดการซ่อม
          </legend>
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
        </fieldset>

        <div className="d-grid gap-2">
          <button
            type="submit"
            className="btn btn-secondary btn-lg"
            disabled={loading}
          >
            {loading ? "กำลังส่ง..." : "ส่งคำร้องแจ้งซ่อม"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComponentTest;
