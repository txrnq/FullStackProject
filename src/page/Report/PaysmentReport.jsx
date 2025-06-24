import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../components/Navbar/sidebar";
import PaymentVerificationPage from "../PaymentVerificationPage"; // ถ้ามี component นี้
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentsReport = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // ดึงข้อมูลจาก API
  useEffect(() => {
    fetch("http://localhost:3000/api/payments")
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setFilteredData(data);
      })
      .catch((err) => console.error("โหลดข้อมูลล้มเหลว:", err));
  }, []);

  // ฟังก์ชันแปลงวันที่เป็นรูปแบบไทย
  const formatThaiDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() + 543}`;
  };

  // ใช้ค้นหาข้อมูลจากชื่อหรือห้อง
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    setFilteredData(
      payments.filter(
        (p) =>
          (p.tenant_name && p.tenant_name.toLowerCase().includes(lowerTerm)) ||
          (p.room_number && p.room_number.toLowerCase().includes(lowerTerm))
      )
    );
  }, [searchTerm, payments]);

  // ฟังก์ชันสร้าง URL ของสลิป
  const getReceiptUrl = (url) => url || "";

  return (
    <div className="d-flex container" style={{ minHeight: "100vh" }}>
      <div style={{ width: 350 }}>
        <Sidebar />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="container-fluid py-4"
        style={{ flexGrow: 1 }}
      >
        <div
          className="position-relative rounded overflow-hidden mb-4"
          style={{ height: "300px" }}
        >
          <img
            src="https://i.pinimg.com/736x/96/70/df/9670df3eab618edc6ed4617752a106bc.jpg"
            alt="background"
            className="w-100 h-100 object-fit-cover"
            style={{ filter: "brightness(40%)" }}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white">
            <h2 className="fw-bold fs-1 text-center">รายงานการชำระเงิน</h2>
          </div>
        </div>

        <div className="mb-4 text-center">
          <input
            type="text"
            className="form-control form-control-lg w-50 mx-auto"
            placeholder="ค้นหา ชื่อผู้เช่า หรือ ห้อง"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>ชื่อผู้เช่า</th>
                <th>ห้อง</th>
                
                <th>จำนวนเงิน (บาท)</th>
                <th>วิธีชำระ</th>
                <th>วันที่ชำระ</th>
                <th>สถานะ</th>
                <th>สลิป</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-5">
                    ไม่มีข้อมูล
                  </td>
                </tr>
              ) : (
                filteredData.map((p, index) => (
                  <tr key={p.payment_id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{p.tenant_name ?? "-"}</td>
                    <td>{p.room_number ?? "-"}</td>
                    
                    <td className="text-end">
                      {p.amount ? parseFloat(p.amount).toLocaleString() + " ฿" : "-"}
                    </td>
                    <td>{p.payment_method ?? "-"}</td>
                    <td>{p.paid_at ? formatThaiDate(p.paid_at) : "-"}</td>
                    <td>{p.payment_status ?? "-"}</td>
                    <td className="text-center">
                      {p.receipt_url ? (
                        <a href={getReceiptUrl(p.receipt_url)} target="_blank" rel="noreferrer">
                          <img
                            src={getReceiptUrl(p.receipt_url)}
                            alt="slip"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                          />
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* ยืนยันการชำระถ้ามี */}
          <PaymentVerificationPage />
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentsReport;
