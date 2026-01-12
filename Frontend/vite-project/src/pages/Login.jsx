import { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!name || !password) {
      alert("Täytä kaikki kentät");
      return;
    }

    if ((name === "rasmus" && password === "1234") || (name === "it" && password === "admin")) {
      onLogin(name);
    } else {
      alert("Väärä käyttäjätunnus tai salasana");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>IT Support Portal</h1>
        <input
          placeholder="Käyttäjätunnus"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Salasana"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Kirjaudu</button>
        <p>Demo:</p>
        <p>rasmus / 1234</p>
        <p>it / admin</p>
      </div>
    </div>
  );
}
