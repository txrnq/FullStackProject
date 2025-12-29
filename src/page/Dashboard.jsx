import "bootstrap/dist/css/bootstrap.min.css";
import "../components/css/Dashboard.css";

import Summary  from "../components/Summary.jsx";
import  Graph  from "../components/Graph.jsx";
import  Report  from "../components/Report.jsx";
import  Repair  from "../components/Repair.jsx";

const Dashboard = () => {
  return (
    // ย้าย Component ทั้งหมดมาไว้ใน wrapper เดียวกัน
    <div
      className="main-content-wrapper"
      style={{ 
        paddingLeft: "280px", // แนะนำให้ทำเป็น CSS Class เพื่อรองรับ Mobile (Media Query)
        width: "100%", 
        transition: "all 0.3s",
        minHeight: "100vh"
      }}
    >
      <div className="container-fluid mt-4 px-4">
        
        {/* Hero Section Card */}
        <div
          className="shadow-lg border-0 mb-4" // เพิ่ม mb-4 เพื่อเว้นระยะห่างจาก Summary
          style={{
            position: "relative",
            width: "100%",
            height: "350px",
            overflow: "hidden",
            borderRadius: "24px",
          }}
        >
          {/* Background Image */}
          <img
            src="https://i.pinimg.com/736x/2b/ba/09/2bba09c655499a92ffc914cbf878119a.jpg"
            alt="background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.05)",
            }}
          />

          {/* Overlay Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "2rem",
            }}
          >
            {/* Glassmorphism Box */}
            <div
              className="p-4 p-md-5"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)", // เพิ่มเบลออีกนิดให้ดูละมุนขึ้น
                WebkitBackdropFilter: "blur(12px)", // สำหรับ Safari
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                maxWidth: "800px",
              }}
            >
              <h1
                className="fw-bold mb-3 text-white display-5 display-md-4" // ปรับขนาดตามหน้าจอ
                style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
              >
                ยินดีต้อนรับเข้าสู่ระบบจัดการหอพัก
              </h1>
              <p className="text-white-50 fs-5 mb-0 fw-light">
                จัดการข้อมูลห้องพัก ผู้เช่า และรายการแจ้งซ่อมได้อย่างง่ายดายในที่เดียว
              </p>
            </div>
          </div>
        </div>

        {/* ส่วนเนื้อหา Dashboard */}
        <div className="container-fluid">
          <Summary />
          
            <div className="col-12 ">
              <Graph />
            </div>
            <div className="col-12 ">
              <Report />
            </div>
         
          <div className="col-12 mt-4">
            <Repair />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;