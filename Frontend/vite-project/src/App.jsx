import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateTicket from "./pages/CreateTicket";
import MyTickets from "./pages/MyTickets";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreateTicket />} />
        <Route path="/tickets" element={<MyTickets />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
