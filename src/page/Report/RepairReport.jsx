import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "../../components/Navbar/sidebar";
import { motion } from 'framer-motion';
import axios from "axios";

function RepairReport() {
  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/repairs")
      .then((res) => res.json())
      .then((data) => {
        setRepairs(data);
      })
      .catch((err) => {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", err);
      });
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "ดำเนินการเสร็จสิ้น":
        return "bg-success";
      case "กำลังดำเนินการ":
        return "bg-warning text-dark";
      case "รอดำเนินการ":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/api/repairs/${id}`, {
        status: newStatus,
      });

      setRepairs((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะอัปเดตสถานะ:", error);
      alert("อัปเดตสถานะไม่สำเร็จ กรุณาลองใหม่");
    }
  };

  return (
    <div className="container" style={{ marginLeft: "560px" }}>
      <Sidebar />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="container-fluid py-4"
      >
        <div
          className="position-relative rounded overflow-hidden mb-4"
          style={{ height: "300px" }}
        >
          <img
            src="https://i.pinimg.com/736x/76/c5/48/76c548c4a5c38a3cf437a1c21e57ceba.jpg"
            alt="background"
            className="w-100 h-100 object-fit-cover"
            style={{ filter: "brightness(30%)" }}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white">
            <h2 className="fw-bold fs-1 text-center">รายงานการแจ้งซ่อม</h2>
          </div>
        </div>

        <div className="card rounded-4 shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered align-middle text-center">
                <thead className="table-secondary">
                  <tr>
                    <th>#</th>
                    <th>ห้อง</th>
                    <th>ชื่อผู้เช่า</th>
                    <th>ประเภท</th>
                    <th>รายละเอียด</th>
                    <th>วันที่แจ้ง</th>
                    <th>สถานะ</th>
                    <th>อัปเดต</th>
                  </tr>
                </thead>
                <tbody>
                  {repairs.length > 0 ? (
                    repairs.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.room_id}</td>
                        <td>{item.tenant_name}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>
                          {new Date(item.requested_at).toLocaleDateString("th-TH")}
                        </td>
                        <td>
                          <span
                            className={`badge ${getStatusBadgeClass(item.status)} fs-6`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <select
                            className="form-select"
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(item.id, e.target.value)
                            }
                          >
                            <option value="" disabled>
                              อัปเดตสถานะ
                            </option>
                            <option value="รอดำเนินการ">รอดำเนินการ</option>
                            <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                            <option value="ดำเนินการเสร็จสิ้น">ดำเนินการเสร็จสิ้น</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center text-muted py-4">
                        ไม่มีข้อมูลแจ้งซ่อม
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RepairReport;
