import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import EmployeesPages from './pages/Employees/EmployeesPages';
import AddEmployee from './pages/Employees/AddEmployee';
import DetailsEmployee from './pages/Employees/DetailsEmployee';
import BranchsPage from './pages/Branch/BranchsPage';
import PositionsPage from './pages/Positions/PositionsPage';
import AddPosition from './pages/Positions/AddPosition';
import AddBranch from './pages/Branch/AddBranch';
import FileListPage from './pages/FilesList/FileListPage';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          path="/"
          element={
            <>
              <PageTitle title="Employees Data | EmployeeContract" />
              <EmployeesPages />
            </>
          }
        />
        <Route
          path="/employees"
          element={
            <>
              <PageTitle title="Employees Data | EmployeeContract" />
              <EmployeesPages />
            </>
          }
        />
        <Route
          path="/add-employee"
          element={
            <>
              <PageTitle title="Import New Employee | EmployeeContract" />
              <AddEmployee />
            </>
          }
        />
        <Route
          path="/employee-details"
          element={
            <>
              <PageTitle title="Detail Employee | EmployeeContract" />
              <DetailsEmployee />
            </>
          }
        />
        <Route
          path="/branches"
          element={
            <>
              <PageTitle title="Branch Data | EmployeeContract" />
              <BranchsPage />
            </>
          }
        />
        <Route
          path="/positions"
          element={
            <>
              <PageTitle title="Positions Data | EmployeeContract" />
              <PositionsPage />
            </>
          }
        />
        <Route
          path="/add-positions"
          element={
            <>
              <PageTitle title="Add New Positions | EmployeeContract" />
              <AddPosition />
            </>
          }
        />
        <Route
          path="/add-branches"
          element={
            <>
              <PageTitle title="Add New Branch | EmployeeContract" />
              <AddBranch />
            </>
          }
        />
        <Route
          path="/file-lists"
          element={
            <>
              <PageTitle title="File List Data | EmployeeContract" />
              <FileListPage />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
