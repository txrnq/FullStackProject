import React from "react";
import { Link } from "react-router-dom";

const RoomCard = ({ id = "N/A", price = 0, status = "available", image = "" }) => {
  const isAvailable = status === "available";

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="position-relative">
        <img
          src={image || "https://placehold.co/600x400?text=No+Image"}
          className="card-img-top"
          alt={`Room ${id}`}
          style={{ height: "180px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400?text=Image+Not+Found";
          }}
        />
        <span
          className={`position-absolute top-0 end-0 m-2 badge ${
            isAvailable ? "bg-success" : "bg-danger"
          }`}
        >
          {isAvailable ? "ว่าง" : "เช่าแล้ว"}
        </span>
      </div>

      <div className="card-body">
        <h5 className="card-title fw-bold">เลขห้อง: {id}</h5>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <span className="text-muted small">ราคา/เดือน</span>
            <div className="fw-bold text-primary fs-5">
              {Number(price).toLocaleString()} บาท
            </div>
          </div>
          
          <div className="btn-group gap-2">
            {/* แก้ไข: ใช้ Link โดยตรง ไม่ต้องมีปุ่มซ้อน */}
            <Link to={`/room/${id}`} className="btn btn-outline-primary btn-sm rounded">
              รายละเอียด
            </Link>
            
            <button
              className={`btn btn-sm ${
                isAvailable ? "btn-primary" : "btn-secondary disabled"
              }`}
              disabled={!isAvailable}
            >
              {isAvailable ? "จองห้อง" : "เต็ม"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;