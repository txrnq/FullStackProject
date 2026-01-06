// Import รูปภาพให้ตรงตาม Path ของคุณ
import room101 from "../assets/images/bander/room101.jpg";
import room102 from "../assets/images/bander/room102.jpg";
import room103 from "../assets/images/bander/room103.jpg";
import room104 from "../assets/images/bander/room104.jpg";
import room105 from "../assets/images/bander/room105.jpg";
import room106 from "../assets/images/bander/room106.jpg";

 // แก้ไข: ลบ { rooms } ออกจากวงเล็บเพื่อไม่ให้ชื่อซ้ำ
  export const rooms = [
    { id: "A101", price: 4500, status: "available", image: room101 },
    { id: "A102", price: 4800, status: "rented", image: room102 },
    { id: "A103", price: 5000, status: "available", image: room103 },
    { id: "A104", price: 5200, status: "rented", image: room104 },
    { id: "B101", price: 4700, status: "rented", image: room105 },
    { id: "B102", price: 4300, status: "available", image: room106 },
  ];

