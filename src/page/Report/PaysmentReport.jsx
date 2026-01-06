import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { billingRecords } from "../../data/billingRecords";

const PaymentsReport = () => {
  // const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // ดึงข้อมูลจาก API
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/payments")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPayments(data);
  //       setFilteredData(data);
  //     })
  //     .catch((err) => console.error("โหลดข้อมูลล้มเหลว:", err));
  // }, []);

  // ฟังก์ชันแปลงวันที่เป็นรูปแบบไทย
  const formatThaiDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${
      date.getFullYear() + 543
    }`;
  };

  // ใช้ค้นหาข้อมูลจากชื่อหรือห้อง
  // ใช้ค้นหาข้อมูลจากชื่อหรือห้อง
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    setFilteredData(
      billingRecords.filter(
        (p) =>
          (p.tenantName && p.tenantName.toLowerCase().includes(lowerTerm)) ||
          (p.roomNumber && p.roomNumber.toLowerCase().includes(lowerTerm))
      )
    );
  }, [searchTerm]);

  return (
   <div className="container py-3 py-md-5" style={{ minHeight: "100vh" }}>
  {/* Header Banner - ปรับความสูงตามขนาดหน้าจอ */}
  <div
    className="position-relative rounded shadow overflow-hidden mb-4 mb-md-5"
    style={{ height: "clamp(150px, 20vh, 250px)" }} 
  >
    <img
      src="https://i.pinimg.com/736x/96/70/df/9670df3eab618edc6ed4617752a106bc.jpg"
      alt="background"
      className="w-100 h-100 object-fit-cover"
      style={{ filter: "brightness(40%)" }}
    />
    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white p-3">
      <h2 className="fw-bold display-6 display-md-5 text-center">รายงานการชำระเงิน</h2>
    </div>
  </div>

  {/* Search Bar - ปรับความกว้างให้เต็มในมือถือ (w-100) และครึ่งเดียวในจอใหญ่ (w-md-50) */}
  <div className="mb-4 d-flex justify-content-center">
    <div className="w-100 w-md-50"> 
      <input
        type="text"
        className="form-control form-control-lg shadow-sm"
        placeholder="🔍 ค้นหา ชื่อผู้เช่า หรือ เลขห้อง..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  </div>

  {/* Table Section - ใช้ table-responsive เพื่อให้เลื่อนซ้ายขวาได้ในมือถือ */}
  <div className="card shadow-sm border-0 rounded overflow-hidden">
    <div className="table-responsive">
      <table className="table table-hover align-middle bg-white mb-0">
        <thead className="table-dark text-center text-nowrap">
          <tr>
            <th style={{ width: "50px" }}>#</th>
            <th className="text-start">ชื่อผู้เช่า</th>
            <th>ห้อง</th>
            <th>จำนวนเงิน</th>
            <th>วิธีชำระ</th>
            <th>วันที่ชำระ</th>
            <th>สลิป</th>
          </tr>
        </thead>
        <tbody className="text-nowrap"> {/* text-nowrap ป้องกันข้อความตัดบรรทัดจนตารางเบี้ยว */}
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-muted py-5">
                ไม่พบข้อมูลการค้นหา
              </td>
            </tr>
          ) : (
            filteredData.map((p, index) => (
              <tr key={p.id}>
                <td className="text-center fw-bold">{index + 1}</td>
                <td className="text-start">{p.tenantName || "-"}</td>
                <td className="text-center">
                   <span className="badge bg-light text-dark border">{p.roomNumber || "-"}</span>
                </td>
                <td className="text-center fw-bold text-primary">
                  {p.amount ? Number(p.amount).toLocaleString() : "0"} ฿
                </td>
                <td className="text-center small">{p.payment_method || "-"}</td>
                <td className="text-center small">
                  {p.paid_at ? formatThaiDate(p.paid_at) : "-"}
                </td>
                <td className="text-center">
                  {p.slip ? (
                    <a href={p.slip} target="_blank" rel="noreferrer">
                      <img
                        src={p.slip}
                        alt="slip"
                        className="rounded border shadow-sm img-thumbnail"
                        style={{
                          width: "45px",
                          height: "45px",
                          objectFit: "cover",
                        }}
                      />
                    </a>
                  ) : (
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>ไม่มีไฟล์</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
};

export default PaymentsReport;
