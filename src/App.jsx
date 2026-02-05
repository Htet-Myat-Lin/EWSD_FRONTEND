import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer, Slide } from "react-toastify";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
<<<<<<< HEAD
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
=======
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
>>>>>>> 620430e3935846c4ce80a257fbc8e69d0ae26ea3
    </>
  );
}

export default App;
