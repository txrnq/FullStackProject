import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/roomCard.css';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import Sidebar from './Navbar/sidebar';

// ตัวอย่าง import รูปภาพ local (เปลี่ยนชื่อไฟล์ตามที่มีจริง)
import room101 from '../assets/images/bander/room101.jpg';
import room102 from '../assets/images/bander/room102.jpg';
import room103 from '../assets/images/bander/room103.jpg';
import room104 from '../assets/images/bander/room104.jpg';
import room105 from '../assets/images/bander/room105.jpg';
import room106 from '../assets/images/bander/room106.jpg';
import room107 from '../assets/images/bander/room107.jpg';
import room108 from '../assets/images/bander/room108.jpg';

function RoomsCard() {
  const rooms = [
    {
      id: 'A101',
      price: 4500,
      status: 'available',
      image: room101
    },
    {
      id: 'A102',
      price: 4800,
      status: 'rented',
      image: room102
    },
    {
      id: 'A103',
      price: 5000,
      status: 'available',
      image: room103
    },
    {
      id: 'A104',
      price: 5200,
      status: 'rented',
      image: room104
    },
    {
      id: 'B101',
      price: 4700,
      status: 'rented',
      image: room105
    },
    {
      id: 'B102',
      price: 4300,
      status: 'available',
      image: room106
    },
    {
      id: 'B103',
      price: 4800,
      status: 'rented',
      image: room107
    },
    {
      id: 'B104',
      price: 5000,
      status: 'available',
      image: room108
    },
  ];


  const getStatusLabel = (status) => {
    switch (status) {
      case 'available':
        return null; // ไม่มีป้ายสถานะถ้าว่าง
      case 'rented':
        return { text: 'เช่าแล้ว', bgColor: '#dc3545' };
      case 'maintenance':
        return { text: 'กำลังซ่อม', bgColor: '#ffc107', color: '#000' };
      default:
        return { text: 'ไม่ทราบสถานะ', bgColor: '#6c757d' };
    }
  };

  return (
    <div className="py-2 px-4 mt-3" style={{ marginLeft: '300px' }}>
      <Sidebar />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container">
          {/* Header Banner */}
          <div style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            height: '300px',
            overflow: 'hidden',
            borderRadius: '10px',
            marginBottom: '1rem',
          }}>
            <img
              src="https://i.pinimg.com/736x/15/a6/9d/15a69d1df2c5ec6d3f862b0bbb10fb64.jpg"
              alt="background"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(40%)',
              }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: '1rem',
            }}>
              <h2 className="fw-bold" style={{ fontSize: '3rem' }}>
                ยินดีต้อนรับเข้าสู่หน้าเลือกห้อง
              </h2>
            </div>
          </div>

          {/* Room Cards */}
          <div className="row g-3 mt-1">
            {rooms.length === 0 ? (
              <div className="text-center py-5 text-muted">ไม่มีข้อมูลห้องพัก</div>
            ) : (
              rooms.map((room) => {
                const statusLabel = getStatusLabel(room.status);

                return (
                  <div className="col-md-3" key={room.id}>
                    <div className="border rounded-4 overflow-hidden shadow-sm h-100">
                      <div style={{ position: 'relative' }}>
                        {statusLabel && (
                          <span style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: statusLabel.bgColor,
                            color: statusLabel.color || '#fff',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            zIndex: 1,
                          }}>
                            {statusLabel.text}
                          </span>
                        )}

                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          <img
                            src={room.image || `https://source.unsplash.com/300x200/?room,apartment&sig=${room.id}`}
                            alt={`ห้อง ${room.id}`}
                            style={{
                              width: '100%',
                              height: '200px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                            }}
                          />
                        </motion.div>
                      </div>

                      <div className="card-body px-4 py-3">
                        <h5 className="fw-semibold text-dark">ห้อง {room.id}</h5>
                        <p className="text-muted mb-3">
                          ราคา: {parseFloat(room.price).toLocaleString()} บาท/เดือน
                        </p>

                        <Link
                          to={room.status === 'available' ? `/rooms/${room.id}` : '#'}
                          className={`btn w-100 rounded-pill ${room.status === 'available' ? 'btn-dark' : 'btn-secondary disabled'}`}
                        >
                          {room.status === 'available' ? 'ดูรายละเอียด' : 'ไม่สามารถเช่าได้'}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RoomsCard;
