import { useState } from "react";

const tabs = [
  {
    id: "salasana",
    title: "Miten vaihdan salasanan?",
    summary: "Vaihto tehdään omasta profiilista turvasyistä.",
  },
  {
    id: "kirjautuminen",
    title: "En pääse kirjautumaan",
    summary:
      "Tarkista käyttäjätunnus, vaihda salasana tai ota yhteys tukeen.",
  },
  {
    id: "lukitus",
    title: "Tili lukittui",
    summary:
      "Liian monta väärää yritystä lukitsee tilin hetkellisesti.",
  },
  {
    id: "tunnistus",
    title: "Miksi vahvistuspyyntö tuli?",
    summary:
      "Ilmoitamme aina, kun kirjautuminen havaitaan uudesta laitteesta.",
  },
  {
    id: "tietoturva",
    title: "Miten tietojani suojataan?",
    summary: "Käytämme vahvaa salaus- ja lokituskäytäntöä.",
  },
];

const passwordSteps = [
  "Kirjaudu sisään omilla tunnuksillasi.",
  "Avaa oikeasta yläkulmasta profiilivalikko.",
  "Valitse 'Asetukset' ja sen jälkeen 'Vaihda salasana'.",
  "Syötä nykyinen salasana ja luo uusi vahva salasana.",
  "Vahvista uusi salasana ja tallenna.",
  "Kirjaudu uudelleen sisään, jos järjestelmä pyytää sitä.",
];

const securityTips = [
  {
    title: "Vahva salasana",
    text:
      "Käytä vähintään 12 merkkiä ja yhdistä isoja ja pieniä kirjaimia, numeroita sekä erikoismerkkejä.",
  },
  {
    title: "Vältä uudelleenkäyttöä",
    text:
      "Älä käytä samaa salasanaa muissa palveluissa. Suosittelemme salasananhallintaa.",
  },
  {
    title: "Huomioi kalastelu",
    text:
      "Älä avaa epäilyttäviä linkkejä. Tarkista lähettäjän osoite aina.",
  },
  {
    title: "Lukitse laitteesi",
    text:
      "Käytä automaattista lukitusta ja päivitä käyttöjärjestelmä säännöllisesti.",
  },
  {
    title: "Ilmoitukset",
    text:
      "Jos saat tuntemattoman kirjautumisilmoituksen, vaihda salasana heti.",
  },
  {
    title: "Tietojen käsittely",
    text:
      "Tukipyynnöt käsitellään luottamuksellisesti ja pääsy on rajattu.",
  },
];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activeItem = tabs.find((item) => item.id === activeTab);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <div>
          <span className="faq-kicker">Tietoturva & tuki</span>
          <h2>Usein kysytyt kysymykset</h2>
          <p>
            Tästä löydät ohjeet yleisiin tilanteisiin sekä tärkeät
            tietoturvakäytännöt. Jos et löydä vastausta, jätä tukipyyntö.
          </p>
        </div>
        <div className="faq-hero-card">
          <h3>Muistilista nopeaan tarkistukseen</h3>
          <ul>
            <li>Pidä salasana yksityisenä ja uniikkina.</li>
            <li>Vaihda salasana heti epäilyttävästä toiminnasta.</li>
            <li>Kirjaudu ulos ja lukitse laite työpäivän lopussa.</li>
          </ul>
        </div>
      </div>

      <section className="faq-section">
        <h3>Tietoturvaohjeet</h3>
        <div className="faq-grid">
          {securityTips.map((tip) => (
            <article key={tip.title} className="faq-card">
              <h4>{tip.title}</h4>
              <p>{tip.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <h3>Ohjeet ja usein kysytyt tilanteet</h3>
        <div className="faq-tabs">
          <div className="faq-tab-list" role="tablist" aria-label="FAQ">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`faq-tab ${activeTab === tab.id ? "is-active" : ""}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <span>{tab.title}</span>
                <small>{tab.summary}</small>
              </button>
            ))}
          </div>
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            className="faq-panel"
          >
            <h4>{activeItem.title}</h4>
            <p>{activeItem.summary}</p>
            {activeTab === "kirjautuminen" && (
              <ol className="faq-list">
                <li>Varmista, että Caps Lock ei ole päällä.</li>
                <li>Kokeile salasanan vaihtoa tai pyydä kertakäyttöinen linkki.</li>
                <li>Ota yhteys tukeen, jos ongelma jatkuu.</li>
              </ol>
            )}
            {activeTab === "salasana" && (
              <ol className="faq-list">
                {passwordSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            )}
            {activeTab === "lukitus" && (
              <ol className="faq-list">
                <li>Odota 10 minuuttia ennen uutta yritystä.</li>
                <li>Tarvittaessa pyydä ylläpitäjää avaamaan tili.</li>
                <li>Tarkista, että käytät oikeaa käyttäjätunnusta.</li>
              </ol>
            )}
            {activeTab === "tunnistus" && (
              <ol className="faq-list">
                <li>Hyväksy pyyntö vain, jos kirjautuminen on sinun.</li>
                <li>Hylkää pyyntö ja vaihda salasana, jos et tunnista sitä.</li>
                <li>Ilmoita tapahtumasta tukitiimille.</li>
              </ol>
            )}
            {activeTab === "tietoturva" && (
              <ol className="faq-list">
                <li>Kaikki istunnot lokitetaan ja poikkeamat seurataan.</li>
                <li>Vain valtuutetuilla henkilöillä on pääsy tukipyyntöihin.</li>
                <li>Varavoimat käytössä palvelun jatkuvuuden varmistamiseksi.</li>
              </ol>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
