import { useState } from "react";
import CreateTicket from "./pages/CreateTicket";
import MyTickets from "./pages/MyTickets";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import FAQ from "./pages/FAQ";
import Welcome from "./pages/Welcome";
import mockTickets from "./data/mockTickets";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("welcome");
  const [tickets, setTickets] = useState(mockTickets);

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />;
  }

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo">IT Support</div>
        <p className="user">{currentUser}</p>
        <nav>
          <button onClick={() => setPage("welcome")}>Etusivu</button>
          {currentUser === "it" && <button onClick={() => setPage("dashboard")}>Dashboard</button>}
          <button onClick={() => setPage("new")}>Tee tiketti</button>
          <button onClick={() => setPage("my")}>Omat tiketit</button>
          <button onClick={() => setPage("faq")}>FAQ</button>
          <button className="logout" onClick={() => setCurrentUser(null)}>Kirjaudu ulos</button>
        </nav>
      </div>

      <div className="content">
        {page === "welcome" && <Welcome currentUser={currentUser} />}
        {page === "dashboard" && currentUser === "it" && (
          <AdminDashboard tickets={tickets} setTickets={setTickets} />
        )}
        {page === "new" && (
          <CreateTicket tickets={tickets} setTickets={setTickets} user={currentUser} />
        )}
        {page === "my" && (
          <MyTickets tickets={tickets} currentUser={currentUser} />
        )}
        {page === "faq" && <FAQ />}
      </div>
    </div>
  );
}
