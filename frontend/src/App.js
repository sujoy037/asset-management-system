import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; // Login component
import AdminDashboard from './pages/AdminDashboard'
import ISDDashboard from './pages/ISD/ISDDashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import AssignRoleStatus from './pages/ISD/AssignRoleStatus'
import AssetTable from './pages/ISD/AssetTable'
//import CreateAssignedAsset from './pages/CreateAssignedAsset'
import AssignAssets from './pages/ISD/AssignAssets';
import UserRolesStatusTable from './pages/ISD/UserRoleStatusTable';
import RaiseComplaint from './pages/ISD/RaiseComplaint';
import XlsUpload from './pages/ISD/XlsUpload';
import Roles from './pages/ISD/Roles';
import Assets from './pages/ISD/Assets';
import Complaints from './pages/ISD/Complaints';
import Report from './pages/ISD/Report';
import History from './pages/ISD/History';
import Status from './pages/ISD/Status';
import Settings from './pages/Settings';
import AssetAllocationStatus from './pages/ISD/AssetAllocationStatus';
import AssetsAssignListbyUser from './pages/ISD/AssetsAssignListbyUser';
import ISDRoleCreationHistory from './pages/ISD/ISDRoleCreationHistory';
import CreateAssetComplaint from './pages/ISD/CreateAssetComplaint';
import TrackComplaints from './pages/ISD/TrackComplaints';
import AdminRoleCreationHistory from './pages/AdminRoleCreationHistory';
import EmployeeRoleCreationHistory from './pages/Employee/EmployeeRoleCreationHistory';
import EmployeeAssignssets from './pages/Employee/EmployeeAssignssets';
import EmployeeAssetsFileUpload from './pages/Employee/EmployeeAssetsFileUpload';
import EmployeeComplaints from './pages/Employee/EmployeeComplaints';
import EmployeeReports from './pages/Employee/EmployeeReports';
import EmployeeHistroy from './pages/Employee/EmployeeHistory';
import AssetsAssignHistory from './pages/ISD/AssetAssignHistory';
import TechnicianDashboard from './pages/TechnicianDashboard';
import TransferAssignedAsset from './pages/ISD/TransferAssignedAsset';
import UpdateAssignedAsset from './pages/ISD/UpdateAssignedAsset';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Protect the Dashboard route */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/isd-dashboard"
          element={
            <ProtectedRoute>
              <ISDDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assign-roles"
          element={
            <ProtectedRoute>
              <AssignRoleStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-roles"
          element={
            <ProtectedRoute>
              <UserRolesStatusTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <XlsUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/total-assets"
          element={
            <ProtectedRoute>
              <AssetTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-assigned-asset"
          element={
            <ProtectedRoute>
              <AssignAssets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/raise-complain"
          element={
            <ProtectedRoute>
              <RaiseComplaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assign-roles-card"
          element={
            <ProtectedRoute>
              <Roles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <Assets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaints"
          element={
            <ProtectedRoute>
              <Complaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/status"
          element={
            <ProtectedRoute>
              <Status />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/status-assets-allocation"
          element={
            <ProtectedRoute>
              <AssetAllocationStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assets-assign-list-by-user"
          element={
            <ProtectedRoute>
              <AssetsAssignListbyUser />
            </ProtectedRoute>
          }
        />
         <Route
          path="/transfer-assigned-asset"
          element={
            <ProtectedRoute>
              <TransferAssignedAsset />
            </ProtectedRoute>
          }
        />
         <Route
          path="/transfer-assigned-asset/:assetId"
          element={
            <ProtectedRoute>
              <UpdateAssignedAsset/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assign-history"
          element={
            <ProtectedRoute>
              <AssetsAssignHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/isd-creation-history"
          element={
            <ProtectedRoute>
              <ISDRoleCreationHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-creation-history"
          element={
            <ProtectedRoute>
              <AdminRoleCreationHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-creation-history"
          element={
            <ProtectedRoute>
              <EmployeeRoleCreationHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/raise-complaints"
          element={
            <ProtectedRoute>
              <CreateAssetComplaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/track-complaint"
          element={
            <ProtectedRoute>
              <TrackComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-assign-asset"
          element={
            <ProtectedRoute>
              <EmployeeAssignssets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-upload"
          element={
            <ProtectedRoute>
              <EmployeeAssetsFileUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-complaints"
          element={
            <ProtectedRoute>
              <EmployeeComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-reports"
          element={
            <ProtectedRoute>
              <EmployeeReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-history"
          element={
            <ProtectedRoute>
              <EmployeeHistroy />
            </ProtectedRoute>
          }
        />
         <Route
          path="/technician-dashboard"
          element={
            <ProtectedRoute>
              <TechnicianDashboard/>
            </ProtectedRoute>
          }
        />
        

        {/* You can add more protected routes like this */}
      </Routes>

    </Router>
  );
};

export default App;
