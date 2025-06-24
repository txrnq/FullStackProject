import React from "react";

import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { motion } from 'framer-motion';
import Notice from "../../../assets/images/notice.png";

const UserRole1 = () => {
    return (
        <div className="user-role-wrapper ">
            <motion.div
                className="flex-grow-1 d-flex flex-column justify-content-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
            ></motion.div>

            <div className="container">
                <div className="card py-5 p-4">

                    <div>
                        <Container className="d-flex flex-column  " >
                            <div
                                className="mb-3 d-flex flex-row  justify-content-between align-items-center"
                                style={{
                                    padding: '0 10px',
                                }}
                            >
                                <Navbar.Brand
                                    href="#home"
                                    className="fw-bold mb-2 mb-md-0"
                                    style={{
                                        fontSize: '1.25rem',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        flex: '1 1 auto',
                                    }}
                                >
                                    🏢 ABC - Monthly Rental Rooms
                                </Navbar.Brand>

                                <Navbar.Brand
                                    href="/"
                                    className="fw-bold text-md-end"
                                    style={{
                                        cursor: 'pointer',
                                        fontSize: '1.25rem',
                                        flexShrink: 0,
                                    }}
                                >
                                    {/* แสดงเฉพาะไอคอนตอนหน้าจอเล็ก */}
                                    <span className="d-md-none">❌</span>

                                    {/* แสดงข้อความเต็มตอนหน้าจอใหญ่ */}
                                    <span className="d-none d-md-inline">❌ Log Out</span>
                                </Navbar.Brand>

                            </div>

                            <div className="navbar-bottom">
                                <Navbar.Text className=''>
                                    👤 Signed in as: <a href="#login" className='text-white text-decoration-underline'>Mark Otto</a>
                                </Navbar.Text>
                            </div>
                        </Container>
                    </div>

                    <div className="d-flex justify-content-center mt-5 mb-5">
                        <img
                            src={Notice} 
                            alt="Notice"
                            className="img-fluid rounded shadow"
                            style={{
                                width: '100%',
                                height: '500px',
                                maxWidth: '600px',
                                border: '4px solid #333',
                                backgroundColor: '#222',
                            }}
                        />
                    </div>

                    <div className="d-flex flex-column align-items-center">
                        <div
                            className="d-flex flex-wrap justify-content-evenly gap-3 py-4 rounded-4"
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                backgroundColor: '#273746',
                                border: '2px solid #333',
                                flexDirection: 'row',
                                padding: '20px',
                              
                            }}
                        >
                            <NavLink
                                to="/UserFormPaysment"
                                className="btn border-3 btn-outline-success text-white py-3 flex-grow-1 fs-5"
                                style={{ transition: 'all 0.3s ease', }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.classList.remove('btn-outline-success');
                                    e.currentTarget.classList.add('btn-success', 'text-white');
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.classList.remove('btn-success', 'text-white');
                                    e.currentTarget.classList.add('btn-outline-success' , 'text-white');
                                }}
                            >
                                💸 | ชำระเงิน
                            </NavLink>

                            <NavLink
                                to="/UserFormRepairs"
                                className="btn btn-outline-danger text-warning py-3 flex-grow-1 fs-5"
                                style={{ transition: 'all 0.3s ease', }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.classList.remove('btn-outline-danger');
                                    e.currentTarget.classList.add('btn-danger', 'text-white');
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.classList.remove('btn-danger', 'text-white');
                                    e.currentTarget.classList.add('btn-outline-danger');
                                }}
                            >
                                🛠 | แจ้งซ่อม
                            </NavLink>
                        </div>
                    </div>

                </div>
            </div >

        </div >
    );
};

export default UserRole1;