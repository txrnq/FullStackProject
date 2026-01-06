import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { rooms } from "../data/room";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ค้นหาข้อมูลห้องที่ตรงกับ id ใน URL
  const room = rooms.find((r) => r.id === id);
  // กรณีหาห้องไม่พบ
  if (!room) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-danger">ไม่พบข้อมูลห้องพักที่คุณต้องการ</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          กลับหน้าหลัก
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* ส่วนนำทาง (Breadcrumb) */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <button
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => navigate("/")}
            >
              หน้าแรก
            </button>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            ห้อง {room.id}
          </li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* ฝั่งซ้าย: รูปภาพห้อง */}
        <div className="col-md-7">
          <img
            src={room.image}
            className="img-fluid rounded shadow-lg"
            alt={`Room ${room.id}`}
            style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
          />
        </div>

        {/* ฝั่งขวา: รายละเอียดและการจอง */}
        <div className="col-md-5">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h1 className="fw-bold mb-2">ห้องพัก {room.id}</h1>
            <h2 className="text-primary fw-bold mb-4">
              {room.price?.toLocaleString()}{" "}
              <small className="text-muted fs-6">บาท/เดือน</small>
            </h2>

            <div className="mb-4">
              <span
                className={`badge px-3 py-2 fs-6 ${
                  room.status === "available" ? "bg-success" : "bg-danger"
                }`}
              >
                {room.status === "available"
                  ? "สถานะ: ว่างพร้อมเช่า"
                  : "สถานะ: มีผู้เช่าแล้ว"}
              </span>
            </div>

            <div className="bg-light p-3 rounded mb-4">
              <h5 className="fw-bold mb-3">สิ่งอำนวยความสะดวก</h5>
              <div className="row g-2">
                <div className="col-6">
                  <i className="bi bi-check2-circle text-success me-2"></i>
                  เครื่องปรับอากาศ
                </div>
                <div className="col-6">
                  <i className="bi bi-check2-circle text-success me-2"></i>
                  เครื่องทำน้ำอุ่น
                </div>
                <div className="col-6">
                  <i className="bi bi-check2-circle text-success me-2"></i>
                  เฟอร์นิเจอร์ครบ
                </div>
                <div className="col-6">
                  <i className="bi bi-check2-circle text-success me-2"></i>ฟรี
                  Wi-Fi
                </div>
              </div>
            </div>

            <div className="d-grid gap-3 mt-auto">
              <button
                className="btn btn-primary btn-lg shadow-sm"
                disabled={room.status !== "available"}
              >
                {room.status === "available"
                  ? "ติดต่อจองห้องพัก"
                  : "ไม่สามารถจองได้"}
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
              >
                ย้อนกลับ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
