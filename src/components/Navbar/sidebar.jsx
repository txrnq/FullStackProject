import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../css/Sidebar.css';

import logo1 from '../../assets/images/logo1.png';

const Sidebar = () => {
    const [reportOpen, setReportOpen] = useState(false);
    const [formManageOpen, setFormManageOpen] = useState(false);


    return (
        <div className="sidebar  bg-dark text-white d-flex flex-column pt-4">
            <div className="text-center mb-5">
                <img src={logo1} alt="Logo" className="logo" />
            </div>

            <Nav defaultActiveKey="/home" className="flex-column px-4 gap-3 fs-5 w-100">
                <Nav.Link as={NavLink} to="/dashboard" className="text-white sidebar-link">🏠 Home</Nav.Link>
                <Nav.Link as={NavLink} to="/RoomListPage" className="text-white sidebar-link">🏨 Rooms</Nav.Link>
                <Nav.Link as={NavLink} to="/Expenses" className="text-white sidebar-link">💰 Expenses</Nav.Link>
                <hr />
                {/* 🔽 รายงาน */}
                <div
                    className="text-white sidebar-link d-flex ms-3 align-items-center pointer"
                    onClick={() => setReportOpen(!reportOpen)}
                >
                    <span className='me-3 '>📄 Report</span>
                    {reportOpen
                        ? <FaChevronUp style={{ cursor: "pointer" }} />
                        : <FaChevronDown style={{ cursor: "pointer" }} />}

                </div>
                {reportOpen && (
                    <div className="ms-4">
                        <Nav.Link as={NavLink} to="/PaysmentReport" className="text-white sidebar-link">
                            💸 Payments Report
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/RepairReport" className="text-white sidebar-link">
                            🛠 Repairs Report
                        </Nav.Link>
                    </div>
                )}

                <hr />

                {/* 🔽 จัดการฟอร์ม */}
                <div
                    className="text-white sidebar-link d-flex ms-3 align-items-center pointer"
                    onClick={() => setFormManageOpen(!formManageOpen)}
                >
                    <span className='me-3'>📄 Form Manage</span>
                    {formManageOpen 
                    ? <FaChevronUp  style={{ cursor: "pointer" }} /> 
                    : <FaChevronDown style={{ cursor: "pointer" }}  />}
                </div>
                {formManageOpen && (
                    <div className="ms-4">
                        <Nav.Link as={NavLink} to="/FormPaysment" className="text-white sidebar-link">
                            📑 FormPaysment
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/FormRepairs" className="text-white sidebar-link">
                            🛠️ FormRepairs
                        </Nav.Link>
                    </div>
                )}

                <hr />
                <Nav.Link as={NavLink} to="/userList" className="text-white sidebar-link">👥 Users</Nav.Link>
                <Nav.Link as={NavLink} to="/404" className="text-white sidebar-link">⚙️ Settings</Nav.Link>
                <hr />
                <Nav.Link as={NavLink} to="/About" className="text-white sidebar-link">📝 About</Nav.Link>
                <hr />
                <Nav.Link as={NavLink} to="/" className="text-white sidebar-link">🚪 Logout</Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
