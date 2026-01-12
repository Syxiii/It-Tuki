import { useState } from "react";

function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitTicket = (e) => {
    e.preventDefault();
    alert("Tiketti luotu (mock)");
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <h2>Uusi tukipyyntö</h2>
      <form onSubmit={submitTicket}>
        <input
          placeholder="Otsikko"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="Kuvaus"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        /><br />
        <button type="submit">Lähetä</button>
      </form>
    </div>
  );
}

export default CreateTicket;
