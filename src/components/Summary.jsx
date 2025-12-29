import { React, useState } from "react";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faUsers,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { faCreativeCommonsNc } from "@fortawesome/free-brands-svg-icons";

const Summary = () => {
  const [stats, _setStats] = useState({
    rentedRooms: 4,
    totalTenants: 5,
    paidTenants: 4,
    unpaidTenants: 1,
  });
  return (
    <>
      <div className="h-100 container-fluid ">
        <div className=" row g-1 ">
          {[
            {
              icon: faUsers,
              label: "จำนวนผู้เช่า",
              value: stats.totalTenants,
              color: "#0d6efd",
            },
            {
              icon: faBed,
              label: "ห้องที่ถูกเช่า",
              value: stats.rentedRooms,
              color: "#212529",
            },
            {
              icon: faMoneyBillWave,
              label: "ห้องที่จ่ายแล้ว",
              value: stats.paidTenants,
              color: "#198754",
            },
            {
              icon: faCreativeCommonsNc,
              label: "ยังไม่จ่าย",
              value: stats.unpaidTenants,
              color: "#dc3545",
            },
          ].map((item, idx) => (
            <div key={idx} className="col-12 col-md-6 col-xl-3">
              <div
                className="mt-5 card-body rounded-3 text-center "
                style={{
                  backgroundColor: `${item.color}15`,
                  borderColor: item.color,
                  borderWidth: "1px", 
                  borderStyle: "solid", 
                }}
              >
                {/* ลด padding จาก py-4 เป็น py-3 เพื่อให้การ์ดไม่สูงโย่งเกินไป */}
                <div className=" d-flex flex-column justify-content-center align-items-center py-3">
                  <FontAwesomeIcon
                    icon={item.icon}
                    size="lg"
                    className="mb-1"
                    style={{ color: item.color }}
                  />
                  {/* ใช้ fs-6 หรือคุมขนาดตัวอักษรให้เล็กหน่อยเพื่อให้ดู Clean */}
                  <h6
                    className="text-muted mb-1 small fw-bold"
                    style={{ fontSize: "1rem" }}
                  >
                    {item.label}
                  </h6>
                  <h3 className="fw-bold mb-2 ">
                    {item.value.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Summary;
