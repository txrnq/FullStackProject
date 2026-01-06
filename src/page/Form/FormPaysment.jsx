import { useState } from "react";
import axios from "../../utils/axiosInstance";
import "../../components/css/Form.css";

const FormPaysment = () => {
  const [formData, setFormData] = useState({
    tenantName: "",
    roomNumber: "",
    billing_month: "",
    amount: "",
    payment_method: "",
    paid_at: "",
    slip: null,
    note: "",
  });

  const [slipPreview, setSlipPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      if (file) {
        setSlipPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      await axios.post("/api/payments", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("ส่งข้อมูลการชำระเงินเรียบร้อยแล้ว!");
      setFormData({
        tenantName: "", roomNumber: "", billing_month: "",
        amount: "", payment_method: "", paid_at: "",
        slip: null, note: "",
      });
      setSlipPreview(null);
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    }
  };

  return (
    <div className="main-content-wrapper container mt-5" style={{ paddingLeft: "280px" , }}>
      <h1 className="text-center mb-3 fw-bold">รายละเอียดการชำระเงิน</h1>

      <form onSubmit={handleSubmit} >
        
        {/* ส่วนข้อมูลผู้เช่า - ใช้โครงสร้างเดียวกับ FormRepair */}
        <div className="mb-4">
          <div className="form-floating mb-4 custom-floating is-fixed">
            <input
              type="text"
              className="form-control border border-secondary"
              id="tenantName"
              name="tenantName"
              placeholder=" "
              value={formData.tenantName}
              onChange={handleChange}
              required
            />
            <label htmlFor="tenantName" className="border border-secondary px-3">
              ชื่อ-นามสกุล ผู้เช่า <span className="text-danger">*</span>
            </label>
          </div>

          <div className="form-floating mb-4 custom-floating is-fixed">
            <input
              type="text"
              className="form-control border border-secondary"
              id="roomNumber"
              name="roomNumber"
              placeholder=" "
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
            <label htmlFor="roomNumber" className="border border-secondary px-3">
              หมายเลขห้อง <span className="text-danger">*</span>
            </label>
          </div>
        </div>

        {/* รายละเอียดการชำระเงิน - ปรับ Grid ให้ Responsive เหมือน FormRepair */}
        <fieldset className=" border border-secondary mb-4 p-2 p-md-3 border rounded-3 ">
          <legend className=" float-none w-auto px-2 fs-6 fw-bold text-secondary text-uppercase">
            ข้อมูลการชำระ
          </legend>

          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6"> {/* ปรับเป็น 12 บนมือถือ */}
              <label htmlFor="billing_month" className="form-label small fw-semibold text-secondary">ประจำเดือน</label>
              <select
                className="form-select border-secondary-subtle"
                id="billing_month"
                name="billing_month"
                value={formData.billing_month}
                onChange={handleChange}
                required
              >
                <option value="">-- เลือกเดือนที่ชำระ --</option>
                {["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", 
                  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="amount" className="form-label small fw-semibold text-secondary">จำนวนเงิน (บาท)</label>
              <input
                type="number"
                className="form-control border-secondary-subtle"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="payment_method" className="form-label small fw-semibold text-secondary">วิธีการชำระเงิน</label>
              <select
                className="form-select border-secondary-subtle"
                id="payment_method"
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                required
              >
                <option value="">-- เลือกช่องทางการชำระเงิน --</option>
                <option value="Qr_payment">Qr_payment</option>
                <option value="เงินสด">เงินสด</option>
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="paid_at" className="form-label small fw-semibold text-secondary">วันที่ชำระเงิน</label>
              <input
                type="date"
                className="form-control border-secondary-subtle"
                id="paid_at"
                name="paid_at"
                value={formData.paid_at}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="slip" className="form-label small fw-semibold text-secondary">แนบหลักฐานการชำระเงิน</label>
            <input
              type="file"
              className="form-control border-secondary-subtle"
              id="slip"
              name="slip"
              accept="image/*"
              onChange={handleChange}
              required
            />
            {slipPreview && (
              <div className="mt-3 text-center bg-white p-2 rounded border shadow-sm">
                <img src={slipPreview} alt="Slip Preview" className="img-fluid rounded" style={{ maxHeight: "200px" }} />
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="note" className="form-label small fw-semibold text-secondary">หมายเหตุ (ถ้ามี)</label>
            <textarea
              className="form-control border-secondary-subtle"
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows="2"
              placeholder="ระบุรายละเอียดเพิ่มเติม..."
            />
          </div>
        </fieldset>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-lg py-3 fw-bold shadow-sm">
            ยืนยันการชำระเงิน
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPaysment;