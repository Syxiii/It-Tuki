import TicketCard from "../components/TicketCard";

function MyTickets({ tickets, currentUser }) {
  const myTickets = tickets.filter(t => t.user === currentUser);

  return (
    <div className="container">
      <h2>Omat tiketit</h2>
      {myTickets.length === 0 && <p>Ei tikettejä</p>}
      {myTickets.map(ticket => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}

export default MyTickets;
