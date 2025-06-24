import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faEnvelope, faPhone, faKey, faUserCircle, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

import Sidebar from './Navbar/sidebar';
import { motion } from 'framer-motion';

function UserEdit() {

  const initialUsers = [
     {
    id: 1,
    name: "ธี สมชาย",
    email: "thee1@example.com",
    password: "password123",
    role: "tenant",
    phone: "0801111111",
    isActive: true,
    createdAt: "2025-06-02T19:04:50.540Z",
    updatedAt: "2025-06-02T19:04:50.540Z"
  },
  {
    id: 2,
    name: "สมศักดิ์ ใจดี",
    email: "somsak@example.com",
    password: "password123",
    role: "employee",
    phone: "0802222222",
    isActive: true,
    createdAt: "2025-06-02T19:04:50.540Z",
    updatedAt: "2025-06-02T19:04:50.540Z"
  },
  {
    id: 3,
    name: "สายรุ้ง จันทร์",
    email: "sairung@example.com",
    password: "password123",
    role: "tenant",
    phone: "0803333333",
    isActive: true,
    createdAt: "2025-06-02T19:04:50.540Z",
    updatedAt: "2025-06-02T19:04:50.540Z"
  },
  {
    id: 4,
    name: "จิราภรณ์ แสงทอง",
    email: "jiraporn@example.com",
    password: "password123",
    role: "admin",
    phone: "0804444444",
    isActive: true,
    createdAt: "2025-06-02T19:04:50.540Z",
    updatedAt: "2025-06-02T19:04:50.540Z"
  },
  {
    id: 5,
    name: "สมชาย ใจเย็น",
    email: "somchai@example.com",
    password: "password123",
    role: "tenant",
    phone: "0805555555",
    isActive: true,
    createdAt: "2025-06-02T19:04:50.540Z",
    updatedAt: "2025-06-02T19:04:50.540Z"
  },
  {
    id: 6,
    name: "นพดล ศรีสุข",
    email: "nopadon@example.com",
    password: "password123",
    role: "employee",
    phone: "0806666666",
    isActive: true,
    createdAt: "2025-06-02T19:04:50.540Z",
    updatedAt: "2025-06-02T19:04:50.540Z"
  },
  {
    id: 7,
    name: "พรทิพย์ รักดี",
    email: "pornthip@example.com",
    password: "password123",
    role: "tenant",
    phone: "0807777777",
    isActive: true,
    createdAt: "2025-06-02T19:04:50.540Z",
    updatedAt: "2025-06-02T19:04:50.540Z"
  },
  {
    id: 8,
    name: "กิตติชัย พลอย",
    email: "kittichai@example.com",
    password: "password123",
    role: "tenant",
    phone: "0808888888",
    isActive: true,
    createdAt: "2025-06-02T19:04:50.540Z",
    updatedAt: "2025-06-02T19:04:50.540Z"
  },
  ];

  const { id } = useParams();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    newPassword: '',
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const userId = parseInt(id, 10);
    const user = initialUsers.find(u => u.id === userId);
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        newPassword: '',
        profileImage: null,
      });
      setPreviewImage(null); // หรือใส่ URL รูปโปรไฟล์จริงถ้ามี
    } else {
      alert('ไม่พบข้อมูลผู้ใช้ที่ต้องการแก้ไข');
      // คุณอาจจะเปลี่ยนเส้นทางไปหน้าอื่น หรือรีเซ็ตฟอร์มได้
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    console.log('ข้อมูลผู้ใช้ที่ส่ง:', formData);
    alert('บันทึกข้อมูลผู้ใช้เรียบร้อยแล้ว!');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', }}
      >
        <div className="container " >
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card shadow-lg rounded-4">
                <div className="card-header bg-primary text-white text-center py-4 rounded-top-4">
                  <h4 className="mb-0 fw-bold">
                    <FontAwesomeIcon icon={faUserEdit} className="me-2" />
                    แก้ไขข้อมูลผู้ใช้
                  </h4>
                </div>
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit} encType="multipart/form-data">

                    {/* รูปโปรไฟล์ */}
                    <div className="text-center mb-4 position-relative">
                      <div className="rounded-circle overflow-hidden mx-auto shadow" style={{ width: '140px', height: '140px' }}>
                        <img
                          src={previewImage || 'https://i.pinimg.com/736x/65/a2/3b/65a23bd9fb01161c9417960efa315172.jpg'}
                          alt="profile"
                          className="w-100 h-100 object-fit-cover"
                        />
                      </div>
                      <label htmlFor="profileImage" className="btn btn-sm btn-light position-absolute bottom-0 end-0 translate-middle shadow-sm" style={{ borderRadius: '50%' }}>
                        <FontAwesomeIcon icon={faCamera} />
                        <input
                          type="file"
                          accept="image/*"
                          id="profileImage"
                          onChange={handleImageChange}
                          hidden
                        />
                      </label>
                    </div>

                    {/* ชื่อ */}
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label fw-semibold">
                        <FontAwesomeIcon icon={faUserCircle} className="me-2 text-primary" />
                        ชื่อ-นามสกุล
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="fullName"
                        name="fullName"
                        placeholder="ชื่อ - นามสกุล"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* อีเมล */}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
                        <FontAwesomeIcon icon={faEnvelope} className="me-2 text-success" />
                        อีเมล
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="email"
                        name="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* เบอร์โทร */}
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label fw-semibold">
                        <FontAwesomeIcon icon={faPhone} className="me-2 text-warning" />
                        เบอร์โทรศัพท์
                      </label>
                      <input
                        type="tel"
                        className="form-control form-control-lg"
                        id="phone"
                        name="phone"
                        placeholder="08x-xxx-xxxx"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* รหัสผ่านใหม่ */}
                    <div className="mb-4">
                      <label htmlFor="newPassword" className="form-label fw-semibold">
                        <FontAwesomeIcon icon={faKey} className="me-2 text-danger" />
                        รหัสผ่านใหม่ (หากต้องการเปลี่ยน)
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="newPassword"
                        name="newPassword"
                        placeholder="********"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                    </div>

                    {/* ปุ่มบันทึก */}
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary btn-lg rounded-pill shadow">
                        <FontAwesomeIcon icon={faUserEdit} className="me-2" />
                        บันทึกการแก้ไข
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer text-muted text-center py-3">
                  <small>ข้อมูลจะถูกเก็บเป็นความลับและใช้เพื่อการติดต่อเท่านั้น</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default UserEdit;
