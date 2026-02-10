function TicketCard({ ticket, isAdmin = false, onStatusChange, onClick }) {
  const statusValue = String(ticket.status || "").trim();
  const statusKey = statusValue.toUpperCase();

  const statusMap = {
    AVOIN: { label: "Avoin", className: "badge-avoin", icon: "🔴" },
    KASITTELYSSA: { label: "Käsittelyssä", className: "badge-kasittelyssa", icon: "🟡" },
    "KÄSITTELYSSÄ": { label: "Käsittelyssä", className: "badge-kasittelyssa", icon: "🟡" },
    RATKAISTU: { label: "Ratkaistu", className: "badge-ratkaistu", icon: "🟢" },
  };

  const statusConfig = statusMap[statusKey];
  const statusLabel = statusConfig?.label || statusValue || "-";
  const statusClass = statusConfig?.className || "";
  const statusIcon = statusConfig?.icon || "";

  return (
    <div
      className={`ticket-card ${onClick ? "ticket-card-clickable" : ""}`}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="ticket-header">
        <div className="ticket-title-section">
          <h3>{ticket.title}</h3>
          <p className="ticket-user">Lähettäjä: {ticket.user}</p>
        </div>
        <span className={`badge ${statusClass}`.trim()}>
          {statusIcon && <span className="status-icon">{statusIcon}</span>}
          {statusLabel}
        </span>
      </div>
      
      <div className="ticket-description">
        <p>{ticket.description}</p>
      </div>
      
      {isAdmin && (
        <div className="ticket-admin-actions">
          <label htmlFor={`status-${ticket.id}`}>Muuta tilaa:</label>
          <select
            id={`status-${ticket.id}`}
            className="status-select"
            value={ticket.status}
            onChange={(e) => onStatusChange(ticket.id, e.target.value)}
          >
            <option value="Avoin">🔴 Avoin</option>
            <option value="Käsittelyssä">🟡 Käsittelyssä</option>
            <option value="Ratkaistu">🟢 Ratkaistu</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default TicketCard;
