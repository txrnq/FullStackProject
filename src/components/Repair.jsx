import React from "react";
import "../components/css/Repair.css";

const Repair = () => {
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

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-12 mb-5 ">
            <div className=" mt-5 border-0 rounded-4 overflow-hidden">
              <div className="card-header bg-white py-3 border-0">
                <h6 className="mb-0 fw-bold text-white ps-3">🔧 รายการแจ้งซ่อม</h6>
              </div>

              <div
                className="table-responsive custom-scrollbar"
                style={{ maxHeight: "300px", overflowY: "auto" }} // เปลี่ยนเป็น auto เพื่อให้เลื่อนได้
              >
                <table className="table table-hover align-middle mb-0 ">
                  <thead
                    className="table-light sticky-top"
                    style={{ zIndex: 10 }}
                  >
                    <tr className="text-secondary small">
                      <th className="py-2 px-4 border-1">#</th>
                      <th className="py-2 border-1 ">ชื่อผู้เช่า</th>
                      <th className="py-2 border-1  text-center">เลขห้อง</th>
                      <th className="py-2 border-1  text-center">วันที่แจ้ง</th>
                      <th className="py-2 border-1  text-center">สถานะ</th>
                      <th className="py-2 border-1 ">หมายเหตุ</th>
                    </tr>
                  </thead>

                  <tbody className="border-top-0 ">
                    {initialRepairs.map((repair, index) => (
                      <tr key={repair.id} style={{ fontSize: "0.9rem", cursor: "pointer" }}>
                        <td className="px-4 text-muted">{index + 1}</td>
                        <td className="fw-medium">{repair.tenant_name}</td>
                        <td className="text-center">
                          <span className="badge bg-light text-dark border fw-normal">
                            {repair.room_id}
                          </span>
                        </td>
                        <td className="text-center text-muted small">
                          {repair.requested_at}
                        </td>
                        <td className="text-center">
                          <span
                            className={`badge rounded-pill px-3 py-2 ${getStatusClass(
                              repair.status
                            )}`}
                            style={{ minWidth: "90px" }} // ปรับ minWidth ให้พอดีกับข้อความ
                          >
                            {repair.status}
                          </span>
                        </td>
                        <td className="text-muted small">
                          {repair.description || (
                            <span className="text-light-emphasis">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Repair;
