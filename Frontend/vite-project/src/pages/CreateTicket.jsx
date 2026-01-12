import { useState } from "react";

export default function CreateTicket({ tickets, setTickets, user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitTicket = (e) => {
    e.preventDefault();
    const newTicket = {
      id: tickets.length + 1,
      title,
      description,
      status: "Avoin",
      user,
    };
    setTickets([...tickets, newTicket]);
    setTitle("");
    setDescription("");
    alert("Tiketti luotu!");
  };

  return (
    <form onSubmit={submitTicket}>
      <h2>Uusi tukipyyntö</h2>
      <input
        placeholder="Otsikko"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Kuvaus"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        required
      />
      <button type="submit">Lähetä</button>
    </form>
  );
}
