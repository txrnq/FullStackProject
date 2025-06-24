import React, { useRef, useState, useEffect } from 'react';
import SignaturePad from 'react-signature-canvas';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/RentalContract.css';

const rooms = [
    { id: "A101", price: 4500, status: "available" },
    { id: "A102", price: 4800, status: "booked" },
    { id: "A103", price: 5000, status: "rented" },
    { id: "A104", price: 4700, status: "available" },
    { id: "B101", price: 4500, status: "booked" },
    { id: "B102", price: 4800, status: "rented" },
    { id: "B103", price: 5000, status: "available" },
    { id: "B104", price: 4700, status: "available" },
];

function RentalContractForm() {
    const { roomId } = useParams();

    const [form, setForm] = useState({
        tenantName: '',
        roomId: '',
        rentPrice: '',
        deposit: '',
        startDate: '',
        endDate: '',
        facilities: 'แอร์, Wi-Fi, เครื่องทำน้ำอุ่น',
        furniture: 'เตียง, ตู้เสื้อผ้า, โต๊ะทำงาน',
        phoneNumber: '',
        createdAt: new Date().toLocaleDateString('th-TH'),
        signature: '',
    });

    // ✅ เมื่อ roomId เปลี่ยน (หรือ mount ครั้งแรก) → หา room ที่ตรง
    useEffect(() => {
        const room = rooms.find((r) => r.id === roomId);
        if (room) {
            setSelectedRoom(room);
            setForm((prev) => ({
                ...prev,
                roomId: room.id,
                rentPrice: room.price.toString(),
                deposit: room.price.toString(),
            }));
        }
    }, [roomId]); // อย่าลืมใส่ roomId เป็น dependency


    const contractRef = useRef();
    const sigPad = useRef();
    const [sigImage, setSigImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const clearSignature = () => {
        sigPad.current.clear();
        setSigImage(null);
    };

    const saveSignature = () => {
        if (!sigPad.current.isEmpty()) {
            const dataUrl = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
            setSigImage(dataUrl);
            setForm(prev => ({ ...prev, signature: dataUrl }));
        } else {
            console.log('Signature pad is empty');
        }
    };

    const exportPDF = async () => {
        const canvas = await html2canvas(contractRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        if (sigImage) {
            pdf.addImage(sigImage, 'PNG', 140, 250, 50, 20);
        }

        pdf.save(`rental-contract-${form.roomId || 'unknown'}.pdf`);
    };

    const formatDateThai = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="container my-5 pb-5" style={{ maxWidth: '850px' }}>
            <form className="mt-5 p-4 border rounded shadow-sm bg-white">
                <h5 className="text-primary fw-semibold mb-4 border-bottom pb-2">ข้อมูลสัญญา</h5>
                <div className="mb-4">
                    <label className="form-label fw-semibold">ชื่อผู้เช่า</label>
                    <input
                        type="text"
                        className="form-control form-control-lg shadow-sm"
                        name="tenantName"
                        value={form.tenantName}
                        onChange={handleChange}
                        placeholder="กรอกชื่อผู้เช่า"
                        required
                    />
                    <label className="form-label fw-semibold mt-3">เบอร์โทรติดต่อ</label>
                    <input
                        type="number"
                        className="form-control form-control-lg shadow-sm"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        placeholder="กรอกเบอร์โทรติดต่อ"
                        required
                    />
                </div>
                <div className="d-flex flex-wrap gap-4 mb-4">
                    <div className="flex-grow-1">
                        <label className="form-label fw-semibold text-secondary">📅 วันที่เริ่มสัญญา</label>
                        <input
                            type="date"
                            className="form-control border border-2 rounded-3 shadow-sm"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex-grow-1">
                        <label className="form-label fw-semibold text-secondary">📅 วันที่สิ้นสุดสัญญา</label>
                        <input
                            type="date"
                            className="form-control border border-2 rounded-3 shadow-sm"
                            name="endDate"
                            value={form.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <h5 className="fw-semibold mb-3">ลายเซ็นผู้เช่า</h5>
                <div className="border rounded bg-light p-3 mb-4">
                    <SignaturePad
                        ref={sigPad}
                        canvasProps={{
                            width: 500,
                            height: 150,
                            className: 'signatureCanvas w-100 border rounded bg-white shadow-sm'
                        }}
                    />
                    <div className="mt-3 d-flex gap-3">
                        <button type="button" className="btn btn-secondary flex-grow-1" onClick={clearSignature}>ล้างลายเซ็น</button>
                        <button type="button" className="btn btn-success flex-grow-1" onClick={saveSignature}>บันทึกลายเซ็น</button>
                    </div>
                </div>
                <div className="d-flex justify-content-end gap-3">
                    <button type="button" className="btn btn-outline-dark rounded-pill px-4 py-2" onClick={() => console.log(form)}>💾 บันทึกข้อมูล</button>
                    <button type="button" className="btn btn-outline-dark rounded-pill px-4 py-2" onClick={exportPDF}>📥 ส่งออก PDF พร้อมลายเซ็น</button>
                    <button type="button" className="btn btn-outline-primary rounded-pill px-4 py-2" onClick={() => window.print()}>🖨 พิมพ์สัญญา</button>
                </div>
            </form>

            {/* Preview สัญญา */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid #ccc',
                    padding: '20px',
                    marginTop: '20px',
                }}>

                <div
                    ref={contractRef}
                    id="printableArea"
                    className="p-5 justify-content-center "
                    style={{
                        width: '210mm',
                        minHeight: '297mm',
                        fontFamily: "'TH Sarabun New', sans-serif",
                        fontSize: '18px',
                        lineHeight: '1.6',
                        color: '#000',
                    }}
                >
                    <h4 className="text-center fw-bold mb-4">สัญญาเช่าห้องพัก</h4>
                    <p>
                        เลขที่สัญญา: RC-2025-001 <br />
                        <span>
                            วันที่: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </p>
                    <p className="fs-4">
                        คู่สัญญา <br />
                        <p className="fs-6 ms-4">
                            ผู้ให้เช่า : ABC RENROOMS .co <br />
                            ผู้เช่า : {form.tenantName} <br />
                            เบอร์โทรศัพท์ : {form.phoneNumber}
                        </p>
                    </p>
                    <p className="fs-4">
                        รายละเอียดและเงื่อนไขการเช่าดังต่อไปนี้
                        <p className="fs-4 ms-4">
                            1. ห้องพัก : {form.roomId} <br />
                            <span className="fs-6 ms-5">
                                ที่อยู่: 115/43 Bangkok
                            </span>
                        </p>
                        <p className="fs-4 ms-4">
                            2. วันที่เช่า : {formatDateThai(form.startDate)} ถึง {form.endDate} <br />
                            <span className="fs-6 ms-4">
                                ** หากผู้เช่าประสงค์จะต่อสัญญา ต้องแจ้งให้ผู้ให้เช่าทราบล่วงหน้าไม่น้อยกว่า 30 วัน
                            </span>
                        </p>
                        <p className="fs-4 ms-4">
                            3. ค่าเช่าและค่าประกัน  <br />
                            <p className="fs-6 ms-4">
                                ค่าเช่า : {form.rentPrice} บาท <br />
                                ค่าประกัน : {form.deposit} บาท
                            </p>
                            <span className="fs-6 ms-4">
                                ** ผู้เช่าต้องชำระค่าเช่าทุกเดือนภายในวันที่ 5 ของเดือน หากผิดนัดจะถูกเรียกค่าปรับวันละ 50 บาท
                            </span>
                        </p>
                        <p className="fs-4 ms-4">
                            4. สิ่งอำนวยความสะดวก  <br />
                            <span className="fs-6 ms-4">
                                {form.facilities}
                            </span>
                        </p>
                        <p className="fs-4 ms-4">
                            5. เฟอร์นิเจอร์และอุปกรณ์  <br />
                            <span className="fs-6 ms-4">
                                {form.furniture} <br />
                            </span>
                            <p className="fs-6 ms-4">
                                ** ผู้เช่าต้องดูแลรักษาทรัพย์สินให้อยู่ในสภาพดี หากเกิดความเสียหายจากการใช้งานผิดวิธี ผู้เช่าต้องรับผิดชอบค่าซ่อมแซมหรือเปลี่ยนใหม่
                            </p>
                        </p>
                        <p className="fs-4 ms-4">
                            6. การบอกเลิกสัญญา  <br />
                            <p className="fs-6 ms-4">
                                <li>
                                    ผู้เช่าต้องแจ้งให้ผู้ให้เช่าทราบล่วงหน้าไม่น้อยกว่า 30 วัน
                                </li>
                                <li>
                                    หากไม่แจ้งล่วงหน้าตามกำหนด ผู้ให้เช่าจะหักเงินประกันเป็นค่าเสียหาย
                                </li>
                                <li>
                                    การคืนเงินประกันจะดำเนินการภายใน 30 วัน หลังจากผู้เช่าส่งมอบห้องคืน
                                </li>
                            </p>
                        </p>
                        <span><br /><hr /></span>
                        <p className=" fs-4 ms-4">
                            7. ข้อห้ามและเงื่อนไขพิเศษ  <br />
                            <p className="fs-6 ms-4">
                                <li>ห้ามเลี้ยงสัตว์ทุกชนิดภายในห้องพัก</li>

                                <li>ห้ามทำเสียงดังรบกวนผู้อื่น โดยเฉพาะช่วงเวลา 22.00–06.00 น.</li>

                                <li> ห้ามดัดแปลงหรือต่อเติมห้องพักโดยไม่ได้รับอนุญาต</li>

                                <li> ห้ามกระทำการใดๆ ที่ผิดกฎหมายภายในสถานที่เช่า</li>

                                <li>ห้ามนำบุคคลภายนอกเข้าพักโดยไม่แจ้งผู้ให้เช่า</li>
                            </p>
                        </p>

                    </p>
                    <div className="mt-5 d-flex justify-content-between">
                        <div>
                            ABC RENROOMS .Co<br />
                            <p className="d-flex justify-content-end">(ผู้ให้เช่า)</p>
                        </div>
                        <div className="text-end">
                            <span className='me-3'>___</span> {form.tenantName} <span className='ms-3'>___</span>
                            <p className="d-flex justify-content-end">(ผู้เช่า)</p>
                            <div className="col text-center mt-5">
                                {sigImage && (
                                    <img
                                        src={sigImage}
                                        alt="signature"
                                        style={{ width: 150, marginBottom: '5px', display: 'block', margin: '0 auto' }}
                                    />
                                )}
                            </div>
                            <p className="mb-0"> (ลายเซ็นผู้เช่า) ___________________________</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default RentalContractForm;
