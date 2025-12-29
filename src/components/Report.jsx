import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Modal } from "react-bootstrap"; // ตรวจสอบว่ามีตัวนี้
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);
const Report = () => {
  const initialPayments = [
    {
      id: 1,
      tenantname: "ธี สมชาย",
      room_number: "A102",
      billing_month: "2025-05-01",
      amount: 4800,
      payment_method: "โอนเงิน",
      paid_at: "2025-05-03",
      payment_status: "ยังไม่ชำระ",
      receipt_url:
        "https://thunder.in.th/wp-content/uploads/2024/06/%E0%B8%AA%E0%B8%A5%E0%B8%B4%E0%B8%9B%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99.webp",
    },

    {
      id: 3,
      tenantname: "สายรุ้ง จันทร์",
      room_number: "A104",
      billing_month: "2025-05-01",
      amount: 5200,
      payment_method: "โอนเงิน",
      paid_at: "2025-05-04",
      payment_status: "ชำระแล้ว",
      receipt_url:
        "https://thunder.in.th/wp-content/uploads/2024/06/%E0%B8%AA%E0%B8%A5%E0%B8%B4%E0%B8%9B%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99.webp",
    },
    {
      id: 4,
      tenantname: "พรทิพย์ รักดี",
      room_number: "B101",
      billing_month: "2025-05-01",
      amount: 4700,
      payment_method: "โอนเงิน",
      paid_at: "2025-05-05",
      payment_status: "ชำระแล้ว",
      receipt_url:
        "https://thunder.in.th/wp-content/uploads/2024/06/%E0%B8%AA%E0%B8%A5%E0%B8%B4%E0%B8%9B%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99.webp",
    },
    {
      id: 5,
      tenantname: "กิตติชัย พลอย",
      room_number: "B103",
      billing_month: "2025-05-01",
      amount: 4800,
      payment_method: "เงินสด",
      paid_at: "2025-05-05",
      payment_status: "รอตรวจสอบ",
      receipt_url:
        "https://thunder.in.th/wp-content/uploads/2024/06/%E0%B8%AA%E0%B8%A5%E0%B8%B4%E0%B8%9B%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99.webp",
    },
  ];
  // 1. ต้องประกาศ State ก่อน
  const [stats, _setStats] = useState({
    totalTenants: 5,
    paidTenants: 3,
    pendingTenants: 1, 
    unpaidTenants: 1,
  });

  // 2. นำข้อมูลจาก stats มาสร้าง pieData
  const pieData = {
    labels: ["จ่ายแล้ว", "รอตรวจสอบ", "ยังไม่ชำระ"],
    datasets: [
      {
        label: "สถานะการชำระ",
        // ดึงค่าจาก stats
        data: [
          stats.paidTenants,
          stats.pendingTenants || 0,
          stats.unpaidTenants,
        ],
        backgroundColor: [
          "#28a745", //  (จ่ายแล้ว)
          "#ffc107", // (รอตรวจสอบ)
          "#dc3545", // (ยังไม่ชำระ)
        ],
        hoverOffset: 10,
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: false }, // เราใช้ <h6> ด้านนอกแล้ว ปิดตรงนี้ไปได้ครับ
    },
    cutout: "90%",
  };

  const [show, setShow] = useState(false);
  const [slipUrl, setSlipUrl] = useState("");

  return (
    <div className="container-fluid">
      <div className="row ">
        {/* --- 1. ส่วนของ Pie Chart --- */}
        <div className="col-lg-6 col-xl-5 mb-4 mb-lg-0">
          <div
            className="card border-0 shadow-sm rounded-4 p-4 h-100"
            style={{ minHeight: "450px" }}
          >
            <h6 className="fw-bold mb-4 text-center">สถานะการชำระค่าเช่า</h6>
            <div style={{ height: "300px", position: "relative" }}>
              <Pie data={pieData} options={options} />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  pointerEvents: "none",
                }}
              >
                <span className="text-muted d-block small">ทั้งหมด</span>
                <span className="fs-4 fw-bold text-dark">
                  {stats.totalTenants}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- 2. ส่วนของตารางรายการล่าสุด --- */}
        <div className="col-lg-6 col-xl-7 ">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
            <div className="card-header bg-white border-0 py-3 px-4">
              <h6 className="fw-bold mb-0">รายการชำระเงินล่าสุด</h6>
            </div>
            <div className="table-responsive px-3 pb-3">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr className="small text-muted text-center">
                    <th className="border-0 text-start">ชื่อผู้เช่า</th>
                    <th className="border-0">ห้อง</th>
                    <th className="border-0">สถานะ</th>
                    <th className="border-0">สลิป</th>
                  </tr>
                </thead>
                <tbody>
                  {initialPayments.slice(0, 5).map((p) => {
                    return (
                      <tr key={p.id} className="text-center">
                        <td className="py-3 px-4 fw-medium text-dark text-start">
                          {p.tenantname}
                        </td>
                        <td className="text-secondary">{p.room_number}</td>
                        <td>
                          <span
                            className={`badge rounded-pill px-3 border ${
                              p.payment_status === "ชำระแล้ว"
                                ? "bg-success-subtle text-success border-success-subtle"
                                : p.payment_status === "รอตรวจสอบ"
                                ? "bg-warning-subtle text-warning border-warning-subtle"
                                : "bg-danger-subtle text-danger border-danger-subtle"
                            }`}
                          >
                            {p.payment_status === "ชำระแล้ว"
                              ? "สำเร็จ"
                              : p.payment_status === "รอตรวจสอบ"
                              ? "รอตรวจสอบ"
                              : "ยังไม่ชำระ"}
                          </span>
                        </td>
                        <td>
                          {p.receipt_url ? (
                            <img
                              src={p.receipt_url}
                              alt="slip"
                              width="45"
                              height="45"
                              className="img-thumbnail rounded-circle object-fit-cover"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setSlipUrl(p.receipt_url);
                                setShow(true);
                              }}
                            />
                          ) : (
                            <span className="text-muted small">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. Modal สำหรับดูสลิป (วางไว้นอกลูปครั้งเดียว) --- */}
      <Modal show={show} onHide={() => setShow(false)} centered size="md">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold text-primary fs-5">
            หลักฐานการชำระเงิน
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center pb-5">
          <img
            src={slipUrl}
            alt="slip preview"
            className="img-fluid rounded-3 shadow-sm"
            style={{ maxHeight: "70vh" }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Report;
