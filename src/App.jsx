import {
  Routes,
  Route,
  useLocation,
  UNSAFE_SingleFetchRedirectSymbol,
} from "react-router-dom";
import { useEffect } from "react";

import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { AnimatePresence } from "framer-motion";

import LoginPage from "./page/LoginPage.jsx";
import Dashboard from "./page/Dashboard.jsx";

import RoomCard from "./components/RoomCard.jsx";
import RoomDetail from "./page/RoomDetail.jsx";

import RepairReport from "./page/Report/RepairReport.jsx";
import PaymentReport from "./page/Report/PaysmentReport.jsx";

import UserRole1 from "./page/Role/User/UserRole1.jsx";

import FormPaysment from "./page/Form/FormPaysment.jsx";
import FormRepairs from "./page/Form/FormRepairs.jsx";

import About from "./page/About.jsx";

import Expenses from "./page/Expenses/Expenses.jsx";

import UserEdit from "./components/UserEdit.jsx";
import UserList from "./page/UsersList.jsx";
import UserDetail from "./components/UserDetail.jsx";
import AddUser from "./page/AddUser.jsx";

import Error404 from "./components/Error404.jsx";

import UserFormPaysment from "./page/Role/User/UserFormPaysment.jsx";
import UserFormRepairs from "./page/Role/User/UserFormRepairs.jsx";

import RentalContract from "./components/RentalContract.jsx";

import PaymentVerificationPage from "./page/PaymentVerificationPage.jsx";

import Testpage from "../src/components/test.jsx";
import Sidebar from "./components/Navbar/sidebar.jsx";

import Graph from "./components/Graph.jsx";
import Report from "./components/Report.jsx";
import Summary from "./components/Summary.jsx";
import Repair from "./components/Repair.jsx";

import ComponentTest from "./components/ComponentTest.jsx";
import RoomListPage from "./components/RoomListPage.jsx";

function App() {
  const location = useLocation();

  useEffect(() => {
    const scrollablePaths = [
      "/dashboard",
      "/roomcard",
      "/UserRole",
      "/RentalContract",
      "/About",
      "/UserFormPaysment",
      "/FormPaysment",
      "/UserFormRepairs",
      "/PaysmentReport",
      "/RepairReport ",
      "/userList",
      "/RoomListPage",
    ];
    const shouldEnableScroll = scrollablePaths.some((path) =>
      location.pathname.startsWith(path)
    );
    document.body.style.overflow = shouldEnableScroll ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [location.pathname]);

  return (
    <div className="flex-1 p-8 ">
      <Sidebar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname} // สำคัญมาก: ต้องใส่ key เพื่อให้ framer รู้ว่าหน้าเปลี่ยนแล้ว
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/roomcard" element={<RoomCard />} />
            <Route path="/room/:id" element={<RoomDetail />} />

            <Route path="/RepairReport" element={<RepairReport />} />
            <Route path="/PaysmentReport" element={<PaymentReport />} />

            <Route path="/UserRole1" element={<UserRole1 />} />
            <Route path="/FormPaysment" element={<FormPaysment />} />
            <Route path="/FormRepairs" element={<FormRepairs />} />
            <Route path="/About" element={<About />} />
            <Route path="/Expenses" element={<Expenses />} />

            <Route path="/UsersEdit/:id" element={<UserEdit />} />
            <Route path="/userList" element={<UserList />} />
            <Route path="/UserDetails/:id" element={<UserDetail />} />
            <Route path="/AddUser" element={<AddUser />} />

            <Route path="/UserFormPaysment" element={<UserFormPaysment />} />
            <Route path="/UserFormRepairs" element={<UserFormRepairs />} />

            <Route path="/RentalContract/:id" element={<RentalContract />} />

            <Route
              path="/PaymentVerificationPage"
              element={<PaymentVerificationPage />}
            />

            <Route path="/404" element={<Error404 />} />

            <Route path="/test" element={<Testpage />} />

            <Route path="/graph" element={<Graph />} />
            <Route path="/report" element={<Report />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/repair" element={<Repair />} />

            <Route path="/RoomListPage" element={<RoomListPage />} />

            <Route path="/ComponentTest" element={<ComponentTest />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
