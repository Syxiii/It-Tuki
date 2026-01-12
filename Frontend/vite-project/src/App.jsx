import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import CreateTicket from "./pages/CreateTicket";
import MyTickets from "./pages/MyTickets";
import AdminDashboard from "./pages/AdminDashboard";
import mockTickets from "./data/mockTickets";

function App() {
  const [tickets, setTickets] = useState(mockTickets); // Yhteinen tila kaikille
  const currentUser = "matti@example.com"; // Mock-käyttäjä

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreateTicket tickets={tickets} setTickets={setTickets} />} />
        <Route path="/tickets" element={<MyTickets tickets={tickets} currentUser={currentUser} />} />
        <Route path="/admin" element={<AdminDashboard tickets={tickets} setTickets={setTickets} />} />
      </Routes>
    </Router>
  );
}

export default App;
