// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home'; 
// import Dashboard from './pages/Dashboard';
// import ResetPassword from './pages/ResetPassword';
// import UserManage from './pages/UserManage';
// import UserManageFirst from './pages/UserManageFirst';
// import UserAccess from './pages/UserAccess';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard" element={<Dashboard/>} />
//         <Route path="/resetpassword" element={<ResetPassword/>} />
//         <Route path="/login" element={<Home />} />
//         <Route path="/usermanage" element={<UserManageFirst/>} />
//         <Route path="/useraccess" element={<UserAccess/>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';
import UserManage from './pages/UserManage';
import UserManageFirst from './pages/UserManageFirst';
import UserAccess from './pages/UserAccess';
import BarCodeWelcomePage from './pages/BarCodeWelcomePage';
import BarCodeScanningTips from './pages/BarCodeScanningTips';
import EnterPackageDetails from './pages/EnterPackageDetails';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/resetpassword" element={<ResetPassword/>} />
        <Route path="/login" element={<Home />} />
        <Route path="/usermanage" element={<UserManageFirst/>} />
        <Route path="/useraccess" element={<UserAccess/>} />
        <Route path="/barcodewelcomepage" element={<BarCodeWelcomePage />} />
        <Route path='/barcodescanningtips' element={<BarCodeScanningTips />} />
        <Route path='/enterpackagedetails' element={<EnterPackageDetails />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
