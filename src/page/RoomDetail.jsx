import React from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';

import room101 from '../assets/images/detail/room101.jpg';
import room101_1 from '../assets/images/detail/room101_1.jpg';
import room101_2 from '../assets/images/detail/room101_2.jpg';
import room101_3 from '../assets/images/detail/room101_3.jpg';
import room103 from '../assets/images/detail/room103.jpg';
import room103_1 from '../assets/images/detail/room103_1.jpg';
import room103_2 from '../assets/images/detail/room103_2.jpg';
import room103_3 from '../assets/images/detail/room103_3.jpg';

import room106 from '../assets/images/detail/room106.jpg';
import room106_1 from '../assets/images/detail/room106_1.jpg';
import room106_2 from '../assets/images/detail/room106_2.jpg';
import room106_3 from '../assets/images/detail/room106_3.jpg';

import room108 from '../assets/images/detail/room108.jpg';
import room108_1 from '../assets/images/detail/room108_1.jpg';
import room108_2 from '../assets/images/detail/room108_2.jpg';
import room108_3 from '../assets/images/detail/room108_3.jpg';


const rooms = [
    { id: "A101", price: 4500, images: [ room101, room101_1, room101_2, room101_3], status: "available" },
    { id: "A102", price: 4800, images: [room103,room103_1, room103_2, room103_3], status: "rented" },
    { id: "A103", price: 5000, images: [room103,room103_1, room103_2, room103_3], status: "available" },
    { id: "A104", price: 4700, images: [room101, room101_1, room101_2, room101_3], status: "rented" },
    { id: "B101", price: 4500, images: [room101, room101_1, room101_2, room101_3], status: "rented" },
    { id: "B102", price: 4800, images: [room106, room106_1, room106_2, room106_3], status: "available" },
    { id: "B103", price: 5000, images: [room101, room101_1, room101_2, room101_3], status: "rented" },
    { id: "B104", price: 4700, images: [room108, room108_1, room108_2, room108_3], status: "available" },
];


function RoomsDetail() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const room = rooms.find((r) => r.id === roomId); if (!room) {
        return <div className="container mt-5">ไม่พบข้อมูลห้อง</div>;
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case "available":
                return (
                    <span className="badge bg-success px-3 py-2 rounded-pill">ห้องว่าง</span>
                );
            case "booked":
                return (
                    <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
                        จองแล้ว
                    </span>
                );
            case "rented":
                return (
                    <span className="badge bg-danger px-3 py-2 rounded-pill">เช่าแล้ว</span>
                );
            default:
                return null;
        }
    };

    return (

        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", background: "linear-gradient(to right, #e0eafc, #cfdef3)" }}
        >
            <div
                className="border rounded-4 shadow-lg p-4"
                style={{
                    maxWidth: "1440px",
                    width: "100%",
                    backgroundColor: "#ffffff",
                }}
            >
                {/* ✅ ปุ่ม Close มุมขวาบน */}
                <div
                    style={{
                        fontSize: "30px",
                        position: "absolute",
                        top: "160px",
                        right: "270px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "#d50000",
                    }}
                    onClick={() => window.history.back()}
                >
                    ✖ | Close
                </div>

                <h3 className="text-center fw-bold mb-4 text-dark">
                    🛏️ รายละเอียดห้องพัก
                </h3>

                <div className="row">
                    {/* รูปภาพห้อง */}
                    <div className="col-md-6 mb-4">
                        <div className="row g-3">
                            {room.images.map((img, index) => (
                                <div className="col-6" key={index}>
                                    <img
                                        src={img}
                                        alt={`รูปที่ ${index + 1}`}
                                        className="img-fluid rounded-3 shadow-sm"
                                        style={{
                                            height: "240px",
                                            objectFit: "cover",
                                            width: "100%",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* รายละเอียดห้อง */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <h5 className="fw-bold text-primary">ห้อง {room.id}</h5>
                            {getStatusBadge(room.status)}
                        </div>
                        <p className="text-muted fs-5 mb-4">
                            💰 ราคา: <span className="fw-semibold">{room.price.toLocaleString()} บาท</span>/เดือน
                        </p>

                        <ul className="list-group mb-4 border">
                            <li className="list-group-item bg-light">
                                <strong>📐 ขนาดห้อง:</strong> 28 ตร.ม.
                            </li>
                            <li className="list-group-item">
                                <strong>🪑 เฟอร์นิเจอร์:</strong> เตียง, ตู้เสื้อผ้า, โต๊ะทำงาน
                            </li>
                            <li className="list-group-item">
                                <strong>🛠 สิ่งอำนวยความสะดวก:</strong> แอร์, เครื่องทำน้ำอุ่น, Wi-Fi
                            </li>
                            <li className="list-group-item">
                                <strong>💼 ค่าประกัน:</strong> 1 เดือน
                            </li>
                        </ul>

                        <div className="d-flex justify-content-center my-4">
                            <button
                                disabled={room.status !== "available"}
                                className={`btn w-100 py-2 rounded-pill fs-5 ${room.status === "available" ? "btn-success" : "btn-secondary"}`}
                                onClick={() => {
                                    if (room.status === "available") {
                                        window.open(`/RentalContract/${room.id}`);
                                    }
                                }}

                            >
                                {room.status === "available" ? "✅ ยืนยันการเช่าห้อง" : "❌ ไม่สามารถเช่าห้องได้"}
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </div>


    );
}

export default RoomsDetail;
