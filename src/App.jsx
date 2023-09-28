import Navigasi from "./components/navigasi";
import Copyright from "./components/copyright";
import { Menu, Order, Dapur, Kasir } from "./pages";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <Copyright />
      <Navigasi />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to={"/menu"} />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/dapur" element={<Dapur />} />
        <Route path="/kasir" element={<Kasir />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
