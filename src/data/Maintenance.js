export const maintenanceData = [
  {
    id: "Maint-001",
    roomNumber: "A101",
    tenantName: "คุณนพดล ใจดี",
    title: "เครื่องปรับอากาศมีน้ำหยด",
    description: "แอร์ในห้องนอนมีน้ำหยดลงมาที่หัวเตียงตลอดเวลา แม้จะปิดเครื่องแล้ว และลมแอร์เริ่มไม่ค่อยเย็น",
    phone: "081-234-5678",
    status: "pending", // รอรับเรื่อง
    category: "เครื่องใช้ไฟฟ้า",
    createdAt: "2026-01-05 09:30"
  },
  {
    id: "Maint-002",
    roomNumber: "B205",
    tenantName: "คุณมณี รัตนา",
    title: "หลอดไฟห้องน้ำขาด",
    description: "เปิดสวิตช์แล้วไฟกระพริบแล้วก็ดับไปเลย ต้องการให้ช่างมาเปลี่ยนหลอดไฟใหม่",
    phone: "089-987-6543",
    status: "in-progress", // กำลังดำเนินการ
    category: "ระบบไฟฟ้า",
    createdAt: "2026-01-06 10:15"
  },
  {
    id: "Maint-003",
    roomNumber: "A104",
    tenantName: "คุณกิตติพงษ์ สุขใจ",
    title: "ก๊อกน้ำอ่างล้างจานชำรุด",
    description: "ตัวโยกก๊อกน้ำหลุดออกมา ทำให้เปิด-ปิดน้ำไม่ได้",
    phone: "082-111-2233",
    status: "completed", // ซ่อมเสร็จสิ้น
    category: "งานประปา",
    createdAt: "2026-01-04 14:00"
  }
];