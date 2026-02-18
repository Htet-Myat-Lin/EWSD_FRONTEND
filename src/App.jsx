import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer, Slide } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/protect-route/ProtectedRoute";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { 	LuGauge, LuUsers, LuSchool, LuCalendarDays, LuHeartHandshake, LuBookPlus } from "react-icons/lu";
import { TbCategory } from "react-icons/tb";
import { Users } from "./features/admin/components/Users";
import { Faculties } from "./features/admin/components/Faculties";
import { AcademicYears } from "./features/admin/components/AcademicYears";
import { Categories } from "./features/admin/components/Categories";

const adminMenuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <LuGauge size={20} />},
  { name: "Users", path: "/admin/users", icon: <LuUsers size={20} /> },
  { name: "Faculties", path: "/admin/faculties", icon: <LuSchool size={20} /> },
  { name: "Academic Years", path: "/admin/academic-years", icon: <LuCalendarDays size={20} /> },
  { name: "Categories", path: "/admin/categories", icon: <TbCategory size={20} /> },
];

const studentMenuItems = [
  { name: "Dashboard", path: "/student/dashboard", icon: <LuGauge size={20} />},
  { name: "Submit Contribution", path: "/student/submit-contribution", icon: <LuBookPlus size={20} /> },
  { name: "My Contributions", path: "/student/my-contributions", icon: <LuHeartHandshake size={20} /> },
];

const marketingCoordinatorMenuItems = [
  { name: "Dashboard", path: "/marketing-coordinator/dashboard", icon: <LuGauge size={20} />},
  { name: "Students", path: "/marketing-coordinator/students", icon: <LuUsers size={20} /> },
  { name: "Contributions", path: "/marketing-coordinator/contributions", icon: <LuHeartHandshake size={20} /> },
];

function App() {
  return (
    <>
      {/* Routes */}
      <Routes>
        <Route index element={<HomePage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        // Admin Routes
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route
            path="/admin"
            element={<DashboardLayout menuItems={adminMenuItems} />}
          >
            <Route path="dashboard" element={<div>Admin Dashboard</div>} />
            <Route path="users" element={<Users />} />
            <Route path="faculties" element={<Faculties />} />
            <Route path="academic-years" element={<AcademicYears />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Route>

        // Student Routes
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route
            path="/student"
            element={<DashboardLayout menuItems={studentMenuItems} />}
          >
            <Route path="dashboard" element={<div>Student Dashboard</div>} />
            <Route path="submit-contribution" element={<div>Submit Contribution</div>} />
            <Route path="my-contributions" element={<div>My Contributions</div>} />
          </Route>
        </Route>

        // Marketing Coordinator Routes
        <Route element={<ProtectedRoute allowedRoles={["marketing_coordinator"]} />}>
          <Route
            path="/marketing-coordinator"
            element={<DashboardLayout menuItems={marketingCoordinatorMenuItems} />} 
          >
            <Route path="dashboard" element={<div>Marketing Coordinator Dashboard</div>} />
            <Route path="students" element={<div>Manage Students</div>} />
            <Route path="contributions" element={<div>Manage Contributions</div>} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Toast */}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  );
}

export default App;
