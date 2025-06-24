import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PaymentVerificationPage() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // ดึงข้อมูลจาก API
  useEffect(() => {
    fetch("http://localhost:3000/api/payments")
      .then((res) => res.json())
      .then((data) => {
        // เพิ่ม dueDate ให้แต่ละรายการ
        const withDueDate = data.map((p) => {
          const monthDate = new Date(p.billing_month);
          const dueDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), 5);
          return { ...p, dueDate };
        });
        setPayments(withDueDate);
        setFilteredData(withDueDate);
      })
      .catch((err) => console.error("โหลดข้อมูลล้มเหลว:", err));
  }, []);

  // ฟังก์ชันค้นหา
  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFilteredData(
      payments.filter(
        (p) =>
          (p.tenant_name && p.tenant_name.toLowerCase().includes(lower)) ||
          (p.room_number && p.room_number.toLowerCase().includes(lower))
      )
    );
  }, [searchTerm, payments]);

  // ฟังก์ชันยืนยันการชำระเงิน (mock ใน frontend)
  const handleVerify = (id) => {
    if (!window.confirm("ยืนยันการชำระเงิน?")) return;

    const updated = payments.map((p) =>
      p.payment_id === id ? { ...p, payment_status: "ชำระแล้ว" } : p
    );
    setPayments(updated);
    setFilteredData(updated);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">📄 ตรวจสอบการชำระเงิน</h2>

      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="ค้นหา ชื่อผู้เช่า หรือ ห้องพัก"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive shadow-sm">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>ชื่อผู้เช่า</th>
              <th>ห้องพัก</th>
              <th>วันครบกำหนด</th>
              <th>จำนวนเงิน (บาท)</th>
              <th>สถานะ</th>
              <th>การดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-muted">
                  ไม่มีข้อมูลการชำระเงิน
                </td>
              </tr>
            ) : (
              filteredData.map((p, index) => (
                <tr key={p.payment_id}>
                  <td>{index + 1}</td>
                  <td>{p.tenant_name}</td>
                  <td>{p.room_number}</td>
                  <td>
                    {p.dueDate
                      ? p.dueDate.toLocaleDateString("th-TH")
                      : "-"}
                  </td>
                  <td>{parseFloat(p.amount).toLocaleString()}</td>
                  <td>
                    {p.payment_status === "ชำระแล้ว" ? (
                      <span className="badge bg-success">ชำระแล้ว</span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        รอตรวจสอบ
                      </span>
                    )}
                  </td>
                  <td>
                    {p.payment_status !== "ชำระแล้ว" ? (
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => handleVerify(p.payment_id)}
                      >
                        ✅ ยืนยัน
                      </button>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentVerificationPage;
