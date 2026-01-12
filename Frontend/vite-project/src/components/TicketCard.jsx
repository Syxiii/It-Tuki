function TicketCard({ ticket, isAdmin = false, onStatusChange }) {
  const statusClass = ticket.status === "Avoin" ? "badge-avoim"
                    : ticket.status === "Käsittelyssä" ? "badge-kasittelyssa"
                    : "badge-ratkaistu";

  return (
    <div className="ticket-card">
      <span>{ticket.title} ({ticket.user})</span>
      
      {isAdmin ? (
        <select
          value={ticket.status}
          onChange={(e) => onStatusChange(ticket.id, e.target.value)}
        >
          <option value="Avoin">Avoin</option>
          <option value="Käsittelyssä">Käsittelyssä</option>
          <option value="Ratkaistu">Ratkaistu</option>
        </select>
      ) : (
        <span className={`badge ${statusClass}`}>{ticket.status}</span>
      )}
    </div>
  );
}

export default TicketCard;
