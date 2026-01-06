import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";

import { maintenanceData } from "../../data/Maintenance";

function RepairReport() {
  const [repairs, setRepairs] = useState([]);

  // โหลดข้อมูลเมื่อ Component เริ่มทำงาน
  useEffect(() => {
    // กรณีใช้ข้อมูลจากไฟล์ Local (Mock Data)
    if (maintenanceData) {
      setRepairs(maintenanceData);
    }

    /* กรณีเชื่อมต่อ API จริง (Uncomment เมื่อพร้อมใช้)
    axios.get("http://localhost:3000/api/repairs")
      .then((res) => setRepairs(res.data))
      .catch((err) => console.error("Error loading data:", err));
    */
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
      case "ดำเนินการเสร็จสิ้น":
        return "bg-success";
      case "in-progress":
      case "กำลังดำเนินการ":
        return "bg-warning text-dark";
      case "pending":
      case "รอดำเนินการ":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  // ฟังก์ชันแปลสถานะเพื่อแสดงผลภาษาไทยในตาราง
  const translateStatus = (status) => {
    const map = {
      pending: "รอดำเนินการ",
      "in-progress": "กำลังดำเนินการ",
      completed: "ดำเนินการเสร็จสิ้น",
    };
    return map[status] || status;
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setRepairs((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("อัปเดตสถานะไม่สำเร็จ:", error);
    }
  };
  return (
    <div className="container py-3 py-md-5">
      {/* Header Banner - ปรับความสูงแบบยืดหยุ่น (Mobile: 150px / Desktop: 300px) */}
      <div
        className="position-relative rounded-4 shadow overflow-hidden mb-4 mb-md-5"
        style={{ height: "clamp(150px, 25vh, 300px)" }}
      >
        <img
          src="https://i.pinimg.com/736x/76/c5/48/76c548c4a5c38a3cf437a1c21e57ceba.jpg"
          alt="background"
          className="w-100 h-100 object-fit-cover"
          style={{ filter: "brightness(40%)" }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white p-3">
          {/* ใช้ display-6 ในมือถือ และ display-5 ในจอใหญ่ */}
          <h2 className="fw-bold display-6 display-md-5 text-center">
            รายงานการแจ้งซ่อม
          </h2>
        </div>
      </div>

      {/* Table Section */}
      <div className="card rounded-4 shadow-sm border-0">
        <div className="card-body p-3 p-md-4">
          {/* table-responsive จะช่วยให้เลื่อนซ้าย-ขวาได้ในมือถือ */}
          <div className="table-responsive">
            <table className="table table-hover align-middle text-center mb-0">
              <thead className="table-light">
                <tr className="text-nowrap">
                  <th>#</th>
                  <th>ห้อง</th>
                  <th className="text-start">ชื่อผู้เช่า</th>
                  <th>หัวข้อ</th>
                  <th>รายละเอียด</th>
                  <th>วันที่แจ้ง</th>
                  <th>สถานะ</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {repairs.length > 0 ? (
                  repairs.map((item, index) => (
                    <tr key={item.id} className="text-nowrap">
                      <td className="fw-bold">{index + 1}</td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {item.roomNumber}
                        </span>
                      </td>
                      <td className="text-start">{item.tenantName}</td>
                      <td className="fw-bold text-primary text-start">
                        {item.title}
                      </td>
                      <td
                        className="text-start small text-muted text-wrap"
                        style={{ minWidth: "200px", maxWidth: "300px" }}
                      >
                        {item.description}
                      </td>
                      <td className="small">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("th-TH")
                          : "-"}
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusBadgeClass(
                            item.status
                          )} px-3 py-2`}
                        >
                          {translateStatus(item.status)}
                        </span>
                      </td>
                      <td style={{ minWidth: "150px" }}>
                        <select
                          className="form-select form-select-sm"
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value)
                          }
                        >
                          <option value="pending">รอดำเนินการ</option>
                          <option value="in-progress">กำลังดำเนินการ</option>
                          <option value="completed">ดำเนินการเสร็จสิ้น</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-5">
                      ไม่มีข้อมูลแจ้งซ่อมในขณะนี้
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepairReport;
