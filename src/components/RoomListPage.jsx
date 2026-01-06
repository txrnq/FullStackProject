import React from "react";
import RoomCard from "./RoomCard";
import "..//components/css/RoomCard.css";
import { rooms } from "../data/room";

const RoomListPage = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">รายการห้องพัก</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {rooms.map((room) => (
          <div className="col" key={room.id}>
            {/* ใช้ {...room} เพื่อส่งข้อมูลทั้งหมดใน object room เข้าไปในครั้งเดียว */}
            <RoomCard {...room} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomListPage;
