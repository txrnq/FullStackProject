import { useState } from 'react';
import axios from 'axios';

function InsertPayment() {
  const [form, setForm] = useState({
    roomNumber: '',
    tenantName: '',
    amount: '',
    paymentMethod: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/payments', form);
      alert('✅ บันทึกข้อมูลชำระเงินเรียบร้อยแล้ว');
      setForm({ roomNumber: '', tenantName: '', amount: '', paymentMethod: '' });
    } catch (err) {
      console.error(err);
      alert('❌ เกิดข้อผิดพลาด');
    }
  };

  return (
    <div>
      <h2>💵 บันทึกการชำระเงิน</h2>
      <form onSubmit={handleSubmit}>
        <input name="roomNumber" placeholder="เลขห้อง" value={form.roomNumber} onChange={handleChange} required />
        <input name="tenantName" placeholder="ชื่อผู้เช่า" value={form.tenantName} onChange={handleChange} required />
        <input name="amount" type="number" placeholder="จำนวนเงิน" value={form.amount} onChange={handleChange} required />
        <input name="paymentMethod" placeholder="วิธีชำระเงิน" value={form.paymentMethod} onChange={handleChange} required />
        <button type="submit">บันทึก</button>
      </form>
    </div>
  );
}

export default InsertPayment;
