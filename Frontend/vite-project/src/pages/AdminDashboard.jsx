import TicketCard from "../components/TicketCard";

function AdminDashboard({ tickets, setTickets }) {
  const changeStatus = (id, newStatus) => {
    setTickets(
      tickets.map(t => t.id === id ? { ...t, status: newStatus } : t)
    );
  };

  return (
    <div className="container">
      <h2>IT-tuen hallintapaneeli</h2>
      {tickets.map(ticket => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          isAdmin={true}
          onStatusChange={changeStatus}
        />
      ))}
    </div>
  );
}

export default AdminDashboard;
