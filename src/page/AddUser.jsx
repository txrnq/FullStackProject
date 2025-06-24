// src/components/AddUser.jsx
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus, faEnvelope, faPhone, faKey, faUserCircle, faUserShield
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

function AddUser() {
  const [formData, setFormData] = useState({
    username: '',
    password_hash: '',
    full_name: '',
    email: '',
    phone: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('เพิ่มผู้ใช้เรียบร้อยแล้ว!');
      setFormData({
        username: '',
        password_hash: '',
        full_name: '',
        email: '',
        phone: '',
        role: '',
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('เกิดข้อผิดพลาดในการเพิ่มผู้ใช้');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg rounded-4">
              <div className="card-header bg-success text-white text-center py-4 rounded-top-4">
                <h4 className="mb-0 fw-bold">
                  <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                  เพิ่มผู้ใช้ใหม่
                </h4>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="mb-3">
                    <label htmlFor="full_name" className="form-label fw-semibold">
                      <FontAwesomeIcon icon={faUserCircle} className="me-2 text-primary" />
                      ชื่อ-นามสกุล
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Username */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label fw-semibold">
                      <FontAwesomeIcon icon={faUserShield} className="me-2 text-dark" />
                      ชื่อผู้ใช้
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password_hash" className="form-label fw-semibold">
                      <FontAwesomeIcon icon={faKey} className="me-2 text-danger" />
                      รหัสผ่าน (Hash หรือ plaintext)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="password_hash"
                      name="password_hash"
                      value={formData.password_hash}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      <FontAwesomeIcon icon={faEnvelope} className="me-2 text-success" />
                      อีเมล
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label fw-semibold">
                      <FontAwesomeIcon icon={faPhone} className="me-2 text-warning" />
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Role */}
                  <div className="mb-4">
                    <label htmlFor="role" className="form-label fw-semibold">
                      <FontAwesomeIcon icon={faKey} className="me-2 text-danger" />
                      บทบาท
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="เช่น tenant / staff / admin"
                      required
                    />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-success btn-lg rounded-pill shadow">
                      <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                      เพิ่มผู้ใช้
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
  );
}

export default AddUser;
