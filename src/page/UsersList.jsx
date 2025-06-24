import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Navbar/sidebar';
import { motion } from 'framer-motion';
import axios from 'axios';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // เริ่มจากโหลด
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  const handleAdd = () => {
    navigate('/AddUser');
  };

  const handleDelete = async (id) => {
    if (window.confirm("คุณต้องการลบผู้ใช้นี้จริงหรือไม่?")) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        alert('ลบไม่สำเร็จ');
      }
    }
  };

  const mapRole = (role) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'employee': return 'Staff';
      case 'tenant': return 'User';
      default: return 'User';
    }
  };

  const renderTable = (roleName, usersByRole) => (
    <div className="mb-5" key={roleName}>
      <h4 className="mb-3">
        {roleName === "Admin" ? "🛡️ ผู้ดูแลระบบ (Admin)" :
          roleName === "Staff" ? "🧑‍💼 พนักงาน (Staff)" :
            "👤 ผู้ใช้ (User)"}
      </h4>
      {usersByRole.length === 0 ? (
        <p>ไม่มีข้อมูลผู้ใช้ในกลุ่มนี้</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ลำดับ</th>
              <th>ชื่อ</th>
              <th>อีเมล</th>
              <th>เบอร์โทร</th>
              <th>สิทธิ์</th>
              <th>การจัดการ</th>
            
            </tr>
          </thead>
          <tbody>
            {usersByRole.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>

                <td>
                  <span className={`badge ${mapRole(user.role) === "Admin" ? "bg-danger" :
                    mapRole(user.role) === "Staff" ? "bg-warning text-dark" :
                      "bg-secondary"}`}>
                    {mapRole(user.role)}
                  </span>
                </td>
                <td className="d-flex justify-content-center">
                  <Link to={`/UserDetails/${user.id}`} className="btn btn-sm btn-outline-primary me-2">
                    รายละเอียด
                  </Link>

                  <Link to={`/UsersEdit/${user.id}`}>
                    <Button variant="warning" size="sm" className="me-2">แก้ไข</Button>
                  </Link>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>ลบ</Button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5" style={{ marginLeft: '560px' }}>
        <motion.div
          className="p-4"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">👥 ข้อมูลผู้ใช้งาน (แบ่งตามสิทธิ์)</h2>
            <Button variant="success" size="sm" onClick={handleAdd}>+ เพิ่มผู้ใช้</Button>
          </div>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status" />
              <span className="ms-2">กำลังโหลดข้อมูล...</span>
            </div>
          ) : (
            <>
              <p>จำนวนผู้ใช้ทั้งหมด: {users.length}</p>
              {renderTable("Admin", users.filter(user => user.role === "admin"))}
              {renderTable("Staff", users.filter(user => user.role === "employee"))}
              {renderTable("User", users.filter(user => user.role === "tenant"))}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserList;
