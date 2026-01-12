function TicketCard({ ticket }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "5px", padding: "5px" }}>
      <strong>{ticket.title}</strong>
      <div>Tila: {ticket.status}</div>
    </div>
  );
}

export default TicketCard;
