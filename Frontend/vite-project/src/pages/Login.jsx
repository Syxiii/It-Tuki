import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Kirjauduttu sisään käyttäjänä: ${email}`);
  };

  return (
    <div>
      <h2>Kirjautuminen</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Sähköposti"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Salasana"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  );
}

export default Login;
