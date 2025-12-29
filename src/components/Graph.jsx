import React from "react";
import { useState } from "react";
import { Bar,  } from "react-chartjs-2";
import "../components/css/Graph.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
);

const Graph = () => {
  const [stats, _setStats] = useState({
    rentedRooms: 4,
    totalTenants: 5,
    paidTenants: 4,
    unpaidTenants: 1,
  });

  const barData = {
    labels: [
      "ห้องที่ถูกเช่า",
      "จำนวนผู้เช่า",
      "ผู้ที่ชำระเงินแล้ว",
      "ผู้ที่ยังไม่ชำระเงิน",
    ],
    datasets: [
      {
        label: "จำนวนหน่วย (ห้อง / คน)",
        data: [
          stats.rentedRooms,
          stats.totalTenants,
          stats.paidTenants,
          stats.unpaidTenants,
        ],
        backgroundColor: [
          "#bde0fe", // ห้องที่ถูกเช่า  ฟ้า
          "#85929e", // จำนวนผู้เช่า  ดำ
          "#abebc6", // ผู้ที่ชำระเงินแล้ว เขียว
          "#e6b0aa", // ผู้ที่ยังไม่ชำระเงิน  แดง
        ],
        borderColor: ["#bde0fe", "#85929e", "#abebc6", "#e6b0aa"],
        borderWidth: 0,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "สถิติภาพรวม" },
    },
  };


  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="fw-bold mb-0">📊 สถิติรายรับ-รายจ่าย</h5>
                <small className="text-muted">
                  เปรียบเทียบข้อมูลรายเดือนปี 2024
                </small>
              </div>
              <button className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                ดูรายละเอียด
              </button>
            </div>

            {/* Container สำหรับกราฟแท่ง */}
            <div
              style={{ height: "350px", width: "100%", position: "relative" }}
            >
              <Bar
                data={barData}
                options={{
                  ...barOptions,
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: { display: false }, // ซ่อน legend ถ้าชื่อแท่งชัดเจนอยู่แล้วจะดูสะอาดขึ้น
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { drawBorder: false, color: "#f0f0f0" },
                    },
                    x: { grid: { display: false } },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Graph;