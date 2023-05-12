import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './component/Auth/Login';
import SignUp from './component/Auth/SignUp';
import PrivateRoutes from './utill/PrivateRoutes'
import UserList from './pages/UserList';

function App() {
  return (
      <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/user" element={<UserList />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
   
  );
}

export default App;
