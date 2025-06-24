
import React, { useState , useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/Dashboard.css';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faUsers, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { faCreativeCommonsNc } from '@fortawesome/free-brands-svg-icons';
// Chart.js
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);
// Framer Motion
import { motion } from 'framer-motion';
// Components
import Sidebar from '../components/Navbar/sidebar';
import axios from '../utils/axiosInstance'; // ← ใช้ axios ที่ตั้งค่า baseURL ไว้แล้ว
// Main Component

const Dashboard = () => {


    const [stats, setStats] = useState({
        rentedRooms: 4,
        totalTenants: 5,
        paidTenants: 4,
        unpaidTenants: 1,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('/stats');
                setStats(res.data);
            } catch (err) {
                console.error('❌ Error loading stats', err);
            }
        };

        fetchStats();
    }, []);
    const barData = {
        labels: ['ห้องที่ถูกเช่า', 'จำนวนผู้เช่า', 'ผู้ที่ชำระเงินแล้ว', 'ผู้ที่ยังไม่ชำระเงิน'],
        datasets: [{
            label: 'จำนวนหน่วย (ห้อง / คน)',
            data: [stats.rentedRooms, stats.totalTenants, stats.paidTenants, stats.unpaidTenants],
            backgroundColor: [
                '#bde0fe', // ห้องที่ถูกเช่า  ฟ้า
                '#85929e', // จำนวนผู้เช่า  ดำ
                '#abebc6', // ผู้ที่ชำระเงินแล้ว เขียว
                '#e6b0aa'  // ผู้ที่ยังไม่ชำระเงิน  แดง
            ],
            borderColor: ['#bde0fe', '#85929e', '#abebc6', '#e6b0aa'],
            borderWidth: 0,
        }],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: 'สถิติภาพรวม' },
        },
    };

    const pieData = {
        labels: ['จ่ายแล้ว', 'ยังไม่จ่าย'],
        datasets: [{
            label: 'สถานะการชำระ',
            data: [stats.paidTenants, stats.unpaidTenants],
            backgroundColor: ['#adf7b6', '#ee6055'],
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: 'สถิติภาพรวม' },
        },
    };

    const initialPayments = [
        {
      id: 1,
      tenantname: "ธี สมชาย",
      room_number: "A102",
      billing_month: "2025-05-01",
      amount: 4800,
      payment_method: "โอนเงิน",
      paid_at: "2025-05-03",
      payment_status: "ชำระแล้ว",
      receipt_url: "https://thunder.in.th/wp-content/uploads/2024/06/%E0%B8%AA%E0%B8%A5%E0%B8%B4%E0%B8%9B%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99.webp",
    },
   
    {
      id: 3,
      tenantname: "สายรุ้ง จันทร์",
      room_number: "A104",
      billing_month: "2025-05-01",
      amount: 5200,
      payment_method: "โอนเงิน",
      paid_at: "2025-05-04",
      payment_status: "ชำระแล้ว",
      receipt_url: "https://thunder.in.th/wp-content/uploads/2024/06/%E0%B8%AA%E0%B8%A5%E0%B8%B4%E0%B8%9B%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99.webp",
    },
    {
      id: 4,
      tenantname: "พรทิพย์ รักดี",
      room_number: "B101",
      billing_month: "2025-05-01",
      amount: 4700,
      payment_method: "โอนเงิน",
      paid_at: "2025-05-05",
      payment_status: "ชำระแล้ว",
      receipt_url: "https://thunder.in.th/wp-content/uploads/2024/06/%E0%B8%AA%E0%B8%A5%E0%B8%B4%E0%B8%9B%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99.webp",
    },
    {
      id: 5,
      tenantname: "กิตติชัย พลอย",
      room_number: "B103",
      billing_month: "2025-05-01",
      amount: 4800,
      payment_method: "เงินสด",
      paid_at: "2025-05-05",
      payment_status: "รอตรวจสอบ",
      receipt_url: "",
    },
    ];

    const initialRepairs = [
       {
      id: 1,
      room_id: "A102",
      tenant_name: "ธี สมชาย",
      title: "เครื่องปรับอากาศเสีย",
      description: "แอร์ไม่เย็น ต้องการให้ช่างมาตรวจสอบ",
      requested_at: "2025-06-01T10:00:00",
      status: "ดำเนินการเสร็จสิ้น",
    },
    {
      id: 2,
      room_id: "B101",
      tenant_name: "สมศักดิ์ ใจดี",
      title: "ท่อน้ำรั่ว",
      description: "มีน้ำรั่วใต้ซิงค์ในห้องน้ำ",
      requested_at: "2025-06-03T15:30:00",
      status: "กำลังดำเนินการ",
    },
    {
      id: 3,
      room_id: "B103",
      tenant_name: "สายรุ้ง จันทร์",
      title: "ไฟดับในห้อง",
      description: "ไฟในห้องไม่ติด ต้องการตรวจสอบระบบไฟฟ้า",
      requested_at: "2025-06-05T09:45:00",
      status: "รอดำเนินการ",
    },
    ];
    

    const getStatusClass = (status) => {
        switch (status) {
            case "ดำเนินการเสร็จสิ้น":
                return "custom-bg-repairs-green";
            case "กำลังดำเนินการ":
                return "custom-bg-repairs-yellow";
            case "รอดำเนินการ":
                return "custom-bg-repairs-red";

        }
    };
    const [show, setShow] = useState(false);
    const [slipUrl, setSlipUrl] = useState('');


    return (

        <div className="container mt-5 " style={{ marginLeft: '560px' }} >
            {/* ภาพพื้นหลัง */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '300px',
                    overflow: 'hidden',
                    borderRadius: '10px',
                }}
            >
                {/* รูปภาพ */}
                <img
                    src="https://i.pinimg.com/736x/2b/ba/09/2bba09c655499a92ffc914cbf878119a.jpg"
                    alt="background"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(40%)',
                    }}
                />

                {/* ข้อความ Overlay */}
                <div
                    style={{
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
                    }}
                >
                    <h2 className="fw-bold" style={{ fontSize: '3rem' }}>
                        ยินดีต้อนรับเข้าสู่ระบบจัดการหอพัก
                    </h2>
                </div>
            </div>
            <Sidebar />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
            >
                {/* Summary Cards */}
                <div className="container">
                    {/* Flex container จัดเรียงการ์ดแนวนอน */}
                    <div className="d-flex justify-content-between" >
                        {[
                            { icon: faUsers, label: 'จำนวนผู้เช่า', value: stats.totalTenants, color: '#0d6efd' },
                            { icon: faBed, label: 'ห้องที่ถูกเช่า', value: stats.rentedRooms, color: '#212529' },
                            { icon: faMoneyBillWave, label: 'ห้องที่จ่ายแล้ว', value: stats.paidTenants, color: '#198754' },
                            { icon: faCreativeCommonsNc, label: 'ยังไม่จ่าย', value: stats.unpaidTenants, color: '#dc3545' },
                        ].map((item, idx) => (
                            <div key={idx} style={{ flex: '0 0 23%', }}>
                                <div
                                    className="card rounded-4 text-center h-100 border mt-4"
                                    style={{
                                        backgroundColor: `${item.color}20`, // background เบา (20 = 12.5% opacity)
                                        borderColor: item.color,
                                        borderWidth: '1px',
                                    }}
                                >
                                    <div className="card-body d-flex flex-column justify-content-center align-items-center py-4 ">
                                        <FontAwesomeIcon icon={item.icon} size="2x" className="mb-3" style={{ color: item.color }} />
                                        <h5 className="text-muted mb-1">{item.label}</h5>
                                        <h3 className="fw-bold">{item.value}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bar Chart */}
                    <div className="row mt-1">
                        <div className="col-12 ">
                            <div className="card p-4 rounded-2 " style={{ height: '350px' }}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div style={{ width: '80%', maxWidth: '600px', height: '300px' }}>
                                        <Bar data={barData} options={barOptions} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Chart + Report */}
                    <div className="row g-2 ">
                        {/* Pie Chart */}
                        <div className="col-lg-3 ">
                            <div className="card  p-3" style={{ minHeight: '300px', height: '100px' }}>
                                <Pie
                                    data={pieData}
                                    options={{
                                        ...options,
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { position: 'bottom' },
                                            title: {
                                                display: true,
                                                text: 'สถานะการชำระค่าเช่า',
                                                font: { size: 16 },
                                            },
                                        },
                                    }}
                                    style={{ height: '100%', width: '100%' }}
                                />
                            </div>
                        </div>

                        {/* Payment Table */}
                        <div className="col-lg-9">
                            <div className="card  border-1 rounded-4 overflow-auto custom-scrollbar" style={{ minHeight: '300px', height: '100px' }}>
                                <div className="table-responsive">
                                    <table className="table table-bordered-bottom table-striped table-hover text-center align-middle">
                                        <thead style={{ backgroundColor: '#000', color: '#000', position: 'sticky', top: '0' }}>
                                            <tr>
                                                <th></th>
                                                <th>ชื่อผู้เช่า</th>
                                                <th>เลขห้อง</th>
                                                <th>เดือน</th>
                                                <th>จำนวนเงิน</th>
                                                <th>ช่องทาง</th>
                                                <th>วันที่ชำระ</th>
                                                <th>หมายเหตุ</th>
                                                <th>สลิป</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {initialPayments.map((payment, index) => (
                                                <tr key={payment.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{payment.tenantname}</td>
                                                    <td>{payment.room_number}</td>
                                                    <td>{payment.month}</td>
                                                    <td>{parseInt(payment.amount).toLocaleString()} บาท</td>
                                                    <td>{payment.payment_method}</td>
                                                    <td>{payment.paid_at}</td>
                                                    <td>{payment.note || '-'}</td>
                                                    <td>
                                                        {payment.receipt_url ? (
                                                            <>
                                                                <img
                                                                    src={payment.receipt_url}
                                                                    alt="slip"
                                                                    width="60"
                                                                    className="img-thumbnail"
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => {
                                                                        setSlipUrl(payment.receipt_url);
                                                                        setShow(true);
                                                                    }}
                                                                />
                                                            </>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </td>
                                                    {/* Modal for slip preview */}
                                                    <Modal
                                                        show={show}
                                                        onHide={() => setShow(false)}
                                                        centered
                                                        size="lg"
                                                        dialogClassName="custom-modal"
                                                        contentClassName="custom-modal-content"
                                                        backdropClassName="custom-backdrop"
                                                    >
                                                        <Modal.Header closeButton className="border-0">
                                                            <Modal.Title className="w-100 text-center fw-bold text-primary">
                                                                สลิปการชำระเงิน
                                                            </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body className="text-center p-4">
                                                            <img
                                                                src={slipUrl}
                                                                alt="slip preview"
                                                            />
                                                        </Modal.Body>
                                                    </Modal>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Repair Table */}
                    <div className="row ">
                        <div className="col-lg-12 mb-5">
                            <div className="card  border-1 rounded-4 p-1 overflow-auto custom-scrollbar" style={{ minHeight: '300px', height: '100px' }}>
                                <div className="table-responsive">
                                    <table className="table table-bordered-bottom table-striped table-hover text-center align-middle">
                                        <thead style={{ backgroundColor: '#000', color: '#000', position: 'sticky', top: '0' }}>
                                            <tr>
                                                <th></th>
                                                <th>ชื่อผู้เช่า</th>
                                                <th>เลขห้อง</th>
                                                <th>วันที่แจ้ง</th>
                                                <th>สถานะ</th>
                                                <th>หมายเหตุ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {initialRepairs.map((repair, index) => (
                                                <tr key={repair.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{repair.tenant_name}</td>
                                                    <td>{repair.room_id}</td>
                                                    <td>{repair.requested_at}</td>
                                                    <td className={` rounded-pill   ${getStatusClass(repair.status)}`} style={{ width: "150px" }}>{repair.status}</td>
                                                    <td>{repair.description || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </motion.div >
        </div >

    );
};

export default Dashboard;
