import React from 'react';

import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaGithub } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import '../components/css/About.css';

function About() {
  return (
    <div className=''>
      <div className='container my-4'>
        <header className='text-center bg-primary text-white py-2 rounded shadow '>
          <h1>การพัฒนาเว็บแอปพลิเคชั่นสำหรับการจัดการห้องเช่ารายเดือน</h1>
          <p>DEVELOPMENT OF A WEB APPLICATION FOR MONTHLY RENTAL ROOM MANAGEMENT</p>
        </header>

        <section className="row mt-5">
          {/* Profile Section */}
          <div className="col-12 col-md-4 d-flex flex-column mt-3">
            <div
              className="text-center bg-light p-5 rounded-4 shadow flex-grow-1"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1519120944692-1a8d8cfc107f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                backdropFilter: 'blur(500px)',

              }}
            >
              {/* content ภายใน */}
              <img
                src="https://i.pinimg.com/736x/ab/be/59/abbe594c181967b6530ab8310f6bc0d5.jpg"
                className="rounded-circle mb-4 shadow"
                alt="รูปโปรไฟล์ทีมงาน"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  border: '5px solid #fff',
                  marginTop: '-80px',
                }}
              />
              <h2 className="text-dark fw-bold mb-2" style={{ fontSize: '36px' }}>
                Teerapat Jitsomnuk
              </h2>
              <p className="text-secondary mb-4" style={{ fontSize: '16px' }}>
                ID: 6430122115111 <br /> สาขา: วิทยาการคอมพิวเตอร์
              </p>

              <div className="p-4 rounded">
                <div className="d-flex justify-content-between flex-wrap gap-5">
                  <Link
                    to="https://facebook.com/yourusername"
                    target="_blank"
                    className="btn btn-outline-light bg-dark flex-fill d-flex align-items-center justify-content-center gap-2 py-3"
                    style={{ transition: '0.3s' }}
                  >
                    <FaFacebookF />
                  </Link>
                  <Link
                    to="mailto:yourmail@gmail.com"
                    className="btn btn-outline-light bg-dark flex-fill d-flex align-items-center justify-content-center gap-2"
                    style={{ transition: '0.3s' }}
                  >
                    <SiGmail />
                  </Link>
                  <Link
                    to="https://github.com/yourusername"
                    target="_blank"
                    className="btn btn-outline-light bg-dark flex-fill d-flex align-items-center justify-content-center gap-2"
                    style={{ transition: '0.3s' }}
                  >
                    <FaGithub />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div
            className="card col-12 col-md-8 d-flex flex-column justify-content-center p-4 bg-white shadow mt-3 mx-auto rounded-4"
            style={{
              fontSize: '18px',
              lineHeight: '1.7',
              textIndent: '50px',
              backgroundImage: 'url(https://i.pinimg.com/736x/67/e0/11/67e011ed19a436d5ad6d3b3dc25b65c5.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backdropFilter: 'blur(500px)',
              maxWidth: '860px', // เพิ่มเพื่อจำกัดความกว้าง
            }}
          >
            <h2 className="mb-3">เราทำอะไร?</h2>
            <p>
              <strong>ระบบจัดการห้องเช่ารายเดือน</strong> ถูกออกแบบมาเพื่อยกระดับการบริหารหอพักหรืออพาร์ตเมนต์ให้เป็นเรื่องง่าย
              ด้วยเทคโนโลยีที่ทันสมัย ช่วยลดงานเอกสาร เพิ่มความแม่นยำ และประหยัดเวลาในการจัดการข้อมูลผู้เช่าและห้องพัก
            </p>
            <p className="text-center mt-2">💻 เทคโนโลยี | 📄 ลดเอกสาร | ⭐ เพิ่มความแม่นยำ | ⌚ ประหยัดเวลา</p>
          </div>

        </section>

        <section>
          <div className="d-flex flex-column justify-content-center bg-white rounded-4 shadow-sm border text-dark p-4 mt-4 mb-5">
            <div className="mb-4">
              <h4 className="text-primary mb-3">✅ วัตถุประสงค์ของระบบ</h4>
              <p style={{ fontSize: '18px', lineHeight: '1.7', textIndent: '2rem' }}>
                ระบบจัดการห้องเช่ารายเดือนถูกออกแบบมาเพื่อช่วยให้การบริหารจัดการห้องพักเป็นเรื่องง่าย
                ทั้งในด้านการเงิน การจัดเก็บข้อมูลผู้เช่า และการดำเนินงานภายในหอพัก ให้สามารถทำงานได้อย่างมีประสิทธิภาพ
                ลดความผิดพลาดและเพิ่มความสะดวกรวดเร็ว
              </p>
            </div>
            <div>
              <h4 className="text-success mb-3">✅ ความสามารถหลักของระบบ</h4>
              <ul className="text-start" style={{ fontSize: '18px', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>จัดการข้อมูลห้องพัก: เพิ่ม/แก้ไข/ลบ/ตั้งราคา และสถานะห้อง</li>
                <li>บันทึกและคำนวณค่าน้ำ ค่าไฟ ค่าเช่ารายเดือนโดยอัตโนมัติ</li>
                <li>ระบบออกบิล พร้อมพิมพ์หรือดาวน์โหลดใบแจ้งหนี้ได้ทันที</li>
                <li>ตรวจสอบประวัติการชำระเงิน และสถานะของผู้เช่าแบบเรียลไทม์</li>
                <li>ระบบแจ้งซ่อม พร้อมติดตามสถานะการดำเนินงานได้อย่างชัดเจน</li>
                <li>รองรับการจัดการสิทธิ์ผู้ใช้งาน: ลูกค้า, พนักงาน, และแอดมิน</li>
              </ul>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}

export default About;