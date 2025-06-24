import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Error404 = () => {
    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center text-center px-3"
            style={{
                height: "100vh",
                background: "linear-gradient(135deg, #007BFF, #0056b3)",
                color: "#fff",
            }}
        >
            <h1 style={{ fontSize: "8rem", fontWeight: "bold", marginBottom: "0.5rem" }}>404</h1>
            <h3 className="mb-3">
                <span className='mb-3' style={{ fontSize: "5rem", marginRight: "0.5rem", display: "flex", alignItems: "center" }}>:( </span>
                Oops! Something is wrong.
            </h3>

            <Link to="/dashboard" className='mt-5'>
                <Button variant="light" size="lg">
                    🔙 กลับสู่หน้าแรก
                </Button>
            </Link>
        </div>
    );
};

export default Error404;
