import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo">IT Support</div>

        <p className="user"> {user}</p>

        <nav>
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
          <button onClick={() => setPage("new")}>Tee tiketti</button>
          <button onClick={() => setPage("my")}>Omat tiketit</button>
          <button onClick={() => setPage("faq")}>FAQ</button>
          <button className="logout" onClick={() => setUser(null)}>Kirjaudu ulos</button>
        </nav>
      </div>

      <div className="content">
        {page === "dashboard" && <Dashboard />}
        {page === "new" && <NewTicket user={user} />}
        {page === "my" && <MyTickets />}
        {page === "faq" && <FAQ />}
      </div>
    </div>
  );
}


function Dashboard() {
  return (
    <>
      <header>
        <h1>Dashboard</h1>
      </header>

      <div className="stats">
        <div className="card open">
          <h3>Avoimet</h3>
          <p>3</p>
        </div>
        <div className="card working">
          <h3>Käsittelyssä</h3>
          <p>2</p>
        </div>
        <div className="card done">
          <h3>Ratkaistut</h3>
          <p>14</p>
        </div>
      </div>
    </>
  );
}

function NewTicket() {
  return (
    <>
      <h1>Uusi tukipyyntö</h1>
      <input placeholder="Otsikko" />
      <textarea placeholder="Kuvaus"></textarea>
      <button>Lähetä</button>
    </>
  );
}

function MyTickets() {
  return (
    <>
      <h1>Omat tiketit</h1>
      <p>VPN ei toimi</p>
      <p>Tulostin rikki</p>
    </>
  );
}

function FAQ() {
  return (
    <>
      <h1>FAQ</h1>
      <p>Miten vaihdan salasanan?</p>
    </>
  );
}
function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (name === "" || password === "") {
      alert("Täytä kaikki kentät");
      return;
    }

    // Demokäyttäjät
    if (
      (name === "rasmus" && password === "1234") ||
      (name === "it" && password === "admin")
    ) {
      onLogin(name);
    } else {
      alert("Väärä käyttäjätunnus tai salasana");
    }
  }

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



