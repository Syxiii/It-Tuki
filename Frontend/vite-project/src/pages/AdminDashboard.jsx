import { useState, useEffect } from "react";
import api from "../pages/api";

export default function AdminDashboard({ token }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const STATUS = {
  AVOIN: "AVOIN",
  KASITTELYSSA: "KASITTELYSSA",
  RATKAISTU: "RATKAISTU"
};

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get("/tickets/gettickets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Tikettien haku epäonnistui");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [token]);

  const changeStatus = async (id, newStatus) => {
    try {
      const res = await api.put(
        `/tickets/update/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTickets((prev) =>
        prev.map((t) => (t.id === id ? res.data : t))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Statusin päivitys epäonnistui");
    }
  };

  const deleteTicket = async (id) => {
    if (!confirm("Oletko varma että haluat poistaa tiketin?")) return;

    try {
      await api.delete(`/tickets/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Tikettiä ei voitu poistaa");
    }
  };

  if (loading) return <div>Ladataan tikettejä...</div>;

  const stats = {
    Avoin: tickets.filter((t) => t.status === STATUS.AVOIN).length,
    "Käsittelyssä": tickets.filter((t) => t.status === STATUS.KASITTELYSSA).length,
    Ratkaistu: tickets.filter((t) => t.status === STATUS.RATKAISTU).length
  };


  return (
    <div className="container">
      <h2>IT-tuen hallintapaneeli</h2>

      <div className="stats">
        {Object.entries(stats).map(([status, count]) => (
          <div key={status} className={`card ${status.toLowerCase()}`}>
            <h3>{status}</h3>
            <p>{count}</p>
          </div>
        ))}
      </div>

      <div className="tickets-list">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card">
            <h4>{ticket.title}</h4>
            <p>{ticket.description}</p>
            <p>Tilanne: {ticket.status}</p>
            <p>
              Käyttäjä: {ticket.user.name} ({ticket.user.email})
            </p>

            <div className="status-buttons">
              {["Avoin", "Käsittelyssä", "Ratkaistu"].map((status) => (
                <button
                  key={status}
                  onClick={() => changeStatus(ticket.id, status)}
                  disabled={ticket.status === status}
                >
                  {status}
                </button>
              ))}
              <button
                className="delete-btn"
                onClick={() => deleteTicket(ticket.id)}
              >
                Poista
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
