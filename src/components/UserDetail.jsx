import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faEnvelope, faPhone, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Sidebar from './Navbar/sidebar';
import { motion } from 'framer-motion';

function UserDetail() {
  const { id } = useParams();

  const initialUsers = [
    { id: 1, name: "ธี สมชาย", email: "thee1@example.com", phone: "0801111111", role: "tenant" },
    { id: 2, name: "สมศักดิ์ ใจดี", email: "somsak@example.com", phone: "0802222222", role: "employee" },
    { id: 3, name: "สายรุ้ง จันทร์", email: "sairung@example.com", phone: "0803333333", role: "tenant" },
    { id: 4, name: "จิราภรณ์ แสงทอง", email: "jiraporn@example.com", phone: "0804444444", role: "admin" },
    { id: 5, name: "สมชาย ใจเย็น", email: "somchai@example.com", phone: "0805555555", role: "tenant" },
    { id: 6, name: "นพดล ศรีสุข", email: "nopadon@example.com", phone: "0806666666", role: "employee" },
    { id: 7, name: "พรทิพย์ รักดี", email: "pornthip@example.com", phone: "0807777777", role: "tenant" },
    { id: 8, name: "กิตติชัย พลอย", email: "kittichai@example.com", phone: "0808888888", role: "tenant" },
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    const user = initialUsers.find((u) => u.id === parseInt(id));
    if (user) {
      setFormData({
        fullName: user.name,
        email: user.email,
        phone: user.phone,
      });
      // สามารถตั้งรูปภาพเริ่มต้น หรือดึงจาก user object ถ้ามีได้
      setPreviewImage('https://i.pinimg.com/736x/65/a2/3b/65a23bd9fb01161c9417960efa315172.jpg');
    }
  }, [id]);

  return (
    <>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        {/* Sidebar fixed width 350px */}
        <div style={{ width: 350 }}>
          <Sidebar />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flex: 1 }}
        >
          <div className="container ">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card shadow-lg rounded-4">
                  <div className="card-header bg-primary text-white text-center py-4 rounded-top-4">
                    <h4 className="mb-0 fw-bold">
                      <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                      ข้อมูลผู้ใช้
                    </h4>
                  </div>
                  <div className="card-body p-4">
                    {/* แสดงรูปโปรไฟล์ (ไม่แก้ไข) */}
                    <div className="text-center mb-4">
                      <div className="rounded-circle overflow-hidden mx-auto shadow" style={{ width: '140px', height: '140px' }}>
                        <img
                          src={previewImage}
                          alt="profile"
                          className="w-100 h-100 object-fit-cover"
                        />
                      </div>
                    </div>

                    {/* ข้อมูลแบบ readonly */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        ชื่อ-นามสกุล
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        value={formData.fullName}
                        readOnly
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        อีเมล
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        value={formData.email}
                        readOnly
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        เบอร์โทรศัพท์
                      </label>
                      <input
                        type="tel"
                        className="form-control form-control-lg"
                        value={formData.phone}
                        readOnly
                      />
                    </div>

                  </div>
                  <div className="card-footer text-muted text-center py-3">
                    <small>ข้อมูลนี้แสดงผลแบบอ่านอย่างเดียว</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default UserDetail;
