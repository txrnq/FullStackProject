import { Routes, Route, useLocation, UNSAFE_SingleFetchRedirectSymbol } from 'react-router-dom';
import { useEffect } from 'react';

import LoginPage from './page/LoginPage.jsx';
import Dashboard from './page/Dashboard.jsx';

import RoomCard from './components/RoomCard.jsx';
import RoomDetail from './page/RoomDetail.jsx';

import RepairReport from './page/Report/RepairReport.jsx';
import PaymentReport from './page/Report/PaysmentReport.jsx';

import UserRole1 from './page/Role/User/UserRole1.jsx';

import FormPaysment from './page/Form/FormPaysment.jsx';
import FormRepairs from './page/Form/FormRepairs.jsx';

import About from './page/About.jsx';

import Expenses from './page/Expenses/Expenses.jsx';

import UserEdit from './components/UserEdit.jsx';
import UserList from './page/UsersList.jsx';
import UserDetail from './components/UserDetail.jsx';
import AddUser from './page/AddUser.jsx';

import Error404 from './components/Error404.jsx';

import UserFormPaysment from './page/Role/User/UserFormPaysment.jsx';
import UserFormRepairs from './page/Role/User/UserFormRepairs.jsx';

import RentalContract from './components/RentalContract.jsx';

import PaymentVerificationPage from './page/PaymentVerificationPage.jsx';

import Testpage from '../src/components/test.jsx';

function App() {
  const location = useLocation();

  useEffect(() => {
    const scrollablePaths = ['/dashboard', '/roomcard', '/UserRole', '/RentalContract', '/About', '/UserFormPaysment','/FormPaysment', '/UserFormRepairs', '/PaysmentReport', '/RepairReport ', '/userList',];
    const shouldEnableScroll = scrollablePaths.some(path =>
      location.pathname.startsWith(path)
    );



    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.pathname]);



  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/roomcard" element={<RoomCard />} />
      <Route path="/rooms/:roomId" element={<RoomDetail />} />

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

      <Route path="/PaymentVerificationPage" element={<PaymentVerificationPage />} />

      <Route path="/404" element={<Error404 />} />

      <Route path="/test" element={<Testpage />} />

    </Routes>
  );
}

export default App;
