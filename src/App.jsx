import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer, Slide } from "react-toastify";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      {/* Routes */}
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
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
