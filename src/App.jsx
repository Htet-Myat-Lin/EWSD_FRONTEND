import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer, Slide } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/protect-route/ProtectedRoute";

function App() {
  return (
    <>
      {/* Routes */}
      <Routes>
        <Route index element={<HomePage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<h1>Admin Dashboard</h1>} />
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
