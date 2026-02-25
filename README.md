# IT-Tuki - IT Support Portal

IT-Tuki on täysin modulaarinen tuki- ja lipunhallintajärjestelmä. Sovellus koostuu kolmesta pääosasta: backend API, web-pääkäyttäjän hallintapaneeli sekä React Native mobiilisovellus käyttäjille.

## Sisällysluettelo

- [Sovelluksen yleiskuvaus](#sovelluksen-yleiskuvaus)
- [Teknologia stack](#teknologia-stack)
- [Vaatimukset](#vaatimukset)
- [Asennusohjeet](#asennusohjeet)
- [Paikallinen kehitys](#paikallinen-kehitys)
- [Projektirakenteen selitys](#projektirakenteen-selitys)
- [API-dokumentaatio](#api-dokumentaatio)
- [Tuotantoympäristöön siirtäminen](#tuotantoympäristöön-siirtäminen)

## Sovelluksen yleiskuvaus

IT-Tuki on tuki- ja lipunhallintajärjestelmä, joka mahdollistaa:

- **Käyttäjät**: Voivat luoda tukilippuja IT-ongelmia varten, seurata lippujen tilaa ja vastaanottaa ilmoituksia
- **Admin-käyttäjät**: Voivat hallita kaikkia lippuja, vastata kommenteilla, muuttaa prioriteetteja ja tiloja
- **Tilastot & Analytics**: Dashboard-näkymät lippujen tilasta ja resoluution ajasta
- **Mobiilituki**: React Native -sovellus iOS ja Android-laitteille

### Pääominaisuudet

- JWT-pohjainen autentikaatio
- Rooli-pohjainen pääsynvalvonta (USER, ADMIN)
- Push-ilmoitukset Firebase Cloud Messaging -palvelun kautta
- PostgreSQL-tietokanta Prisma ORM:llä
- Docker-kontainerit kehitys- ja tuotantoympäristöille

## Teknologia Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web-kehys
- **PostgreSQL** - Relaatiotietokanta
- **Prisma** - ORM ja migraatiot
- **Firebase Admin** - Push-ilmoitukset
- **Argon2** - Salasanojen hash-funktio
- **JWT** - Autentikaatio
- **NGINX** - CORS Autentikaatio ja routing docker kontteihin.

### Frontend
- **React 19** - UI-kirjasto
- **Vite** - Rakennustyökalu ja kehityspalvelin
- **React Router** - Reitittäminen
- **Axios** - HTTP-asiakas
- **NGINX** - Routing docker kontteihin.

### Mobile
- **React Native** - Cross-platform mobiilikehitys
- **TypeScript** - Typpiturvallinen JavaScript
- **Android & iOS** - Natiiviympäristöt

### DevOps
- **Docker** - Kontainerisaatio
- **Docker Compose** - Monista palvelun orkestrointi
- **PostgreSQL Docker image** - Tietokanta

## Vaatimukset

### Kaikkiin osiin
- **Git** - Versionhallinto
- **Node.js** (v18+)
- **npm** tai **yarn** - Paketinhallinta

### Dockerilla (suositeltu)
- **Docker Desktop** (v4.0+)
- Sisältää Docker Enginen ja Docker Composin

### Ilman Dockeria (paikallinen kehitys)
- **PostgreSQL** (v14+) - Asennettu paikallisesti
- Node.js asennettu kaikkiin kolmeen projektiin

## Asennusohjeet

### 1. Kloonaa repositorio

\\\ash
git clone <repository-url>
cd It-Tuki
\\\

### 2. Konfiguroi ympäristömuuttujat

#### Backend-konfiguraatio
Luo tiedosto \Backend/prisma/.env.dev\:

\\\env
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/app_dev"
NODE_ENV="development"
API_PORT=8080
JWT_SECRET="your-secret-secret-change-in-production"
FIREBASE_PROJECT_ID="your-firebase-project-id"
FIREBASE_PRIVATE_KEY="your-firebase-private-key"
FIREBASE_CLIENT_EMAIL="your-firebase-client-email"
\\\

**Huom**: Firebase-konfiguraatio on valinnainen. Voit päivittää \Backend/app.js\:n poistamaan Firebase-toiminnallisuuden, jos sitä ei tarvita kehityksessä.

## Paikallinen kehitys

### Vaihtoehto A: Docker Compose (Suositeltu)

Tämä on helpoin tapa saada kaikki palvelut käyttöön.

#### 1. Käynnistä kaikki palvelut

\\\ash
cd It-Tuki
docker compose -f docker-compose.dev.yml up --build
\\\

#### 2. Ohjatut palvelut

Kun komento on valmis, sinulla on käytettävissä:

- **Frontend**: http://localhost:5173 (React-sovellus)
- **Backend API**: http://localhost:8080 (REST API)
- **PostgreSQL**: localhost:5432 (tietokanta)

#### 3. Testikäyttäjä

Docker Compose luo automaattisesti testikäyttäjän:
- **Sähköposti**: admin@test.com
- **Salasana**: admin123
- **Rooli**: ADMIN

#### 4. Koodin muutokset

Dockerfile.dev-tiedostot on konfiguroitu käyttämään bind mounts, joten:
- Muutokset koodiin **näkyvät heti** ilman uudelleenkäynnistystä
- Backend/Frontend päivittyvät hot-reload -toiminnallisuudella

#### 5. Pääsy tietokantaan

\\\ash
# Luo psql-yhteys kehitys-tietokantaan
docker exec -it dev-postgres psql -U postgres -d app_dev

# Tai käytä pgAdmin:ia tai DBeaver:ia graafisesti
\\\

#### 6. Lopeta palvelut

\\\ash
docker compose -f docker-compose.dev.yml down

# Poista myös tiedot (tietokanta nollattu seuraavalla käynnistyksellä)
docker compose -f docker-compose.dev.yml down -v
\\\

### Vaihtoehto B: Paikallinen kehitys ilman Dockeria

Jos et halua käyttää Dockeria:

#### 1. PostgreSQL-tietokanta

Asenna ja käynnistä PostgreSQL. Luo tietokanta:

\\\ash
createdb app_dev
\\\

#### 2. Backend-asennus

\\\ash
cd Backend
npm install
npx prisma migrate dev
npm run dev
\\\

Backend käynnistyy osoitteeseen http://localhost:8080

#### 3. Frontend-asennus

\\\ash
cd Frontend/vite-project
npm install
npm run dev
\\\

Frontend käynnistyy osoitteeseen http://localhost:5173

#### 4. Mobile-asennus (valinnainen)

\\\ash
cd IT-M/Mobile
npm install
# iOS-kehitys
cd ios && pod install && cd ..
npm run ios

# Tai Android
npm run android
\\\

## Projektirakenteen selitys

\\\
It-Tuki/
 Backend/                    # Node.js/Express API
    controllers/            # Liiketoimintalogiikka
    routes/                 # API-reitit
    middleware/             # Express-middleware
    prisma/                 # Tietokanta & ORM
       schema.prisma       # Tietokannan malli
       migrations/         # Migraatiot
       seed.js             # Siementiedot
    utils/                  # Apufunktiot
    app.js                  # Sovelluksen päätiedosto
    package.json

 Frontend/vite-project/      # React-web-sovellus
    src/
       components/         # Käyttöliittymäkomponentit
       pages/              # Sivukomponentit
       services/           # API-asiakas
       App.jsx             # Pääkomponentti
    vite.config.js          # Vite-konfiguraatio
    package.json

 IT-M/Mobile/                # React Native -sovellus
    navigation/             # Navigaatio-komponentit
    pages/                  # Näytöt
    App.tsx                 # Pääkäynnistys
    android/                # Android-kohtainen koodi
    ios/                    # iOS-kohtainen koodi
    package.json

 docker-compose.dev.yml      # Docker-kehityscompose
 README.md                   # Tämä tiedosto
\\\

### Backend-rakenne

#### Controllers (\Backend/controllers/\)
- \uthController.js\ - Kirjautuminen/rekisteröinti
- \	icketController.js\ - Lippujen CRUD-toiminnot
- \commentController.js\ - Kommentit lipuille
- \statsController.js\ - Tilastot ja analytiikka

#### Routes (\Backend/routes/\)
- \uthRoutes.js\ - \/api/auth\ -pääte
- \	icketRoutes.js\ - \/api/tickets\ -pääte
- \statsRoutes.js\ - \/api/stats\ -pääte

#### Middleware (\Backend/middleware/\)
- \uthMiddleware.js\ - JWT-vahvistus

#### Database (\Backend/prisma/\)
- \schema.prisma\ - Tietokannan mallit: User, Ticket, Comment
- \seed.js\ - Alkuperäiset testievät
- \migrations/\ - Tietokannan versio-historia

### Frontend-rakenne

#### Pages (\Frontend/vite-project/src/pages/\)
- \Welcome.jsx\ - Tervetuloa-sivu
- \Login.jsx\ - Kirjautumissivu
- \CreateTicket.jsx\ - Uuden lipun luonti
- \MyTickets.jsx\ - Käyttäjän lipujen lista
- \AdminDashboard.jsx\ - Admin-hallintapaneeli
- \UserManagement.jsx\ - Käyttäjien hallinta
- \FAQ.jsx\ - Usein kysytyt kysymykset

## API-dokumentaatio

### Autentikaatio

#### Rekisteröinti
\\\
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "Käyttäjä",
  "password": "salasana"
}

Vastaus: { "token": "jwt-token", "user": {...} }
\\\

#### Kirjautuminen
\\\
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "admin123"
}

Vastaus: { "token": "jwt-token", "user": {...} }
\\\

### Liput

#### Luo uusi lippu
\\\
POST /api/tickets
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Wifi ei toimi",
  "description": "Ethernet-yhteys kaatui",
  "priority": "KORKEA"
}
\\\

#### Hae kaikki liput (admin-näkymä)
\\\
GET /api/tickets
Authorization: Bearer {token}
\\\

#### Päivitä lipun tila
\\\
PUT /api/tickets/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "RATKAISTU",
  "priority": "MATALA"
}
\\\

#### Lisää kommentti lipulle
\\\
POST /api/tickets/{id}/comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "text": "Ongelmaa tutkitaan..."
}
\\\

### Tilastot

#### Dashboard-tilastot
\\\
GET /api/stats/dashboard
Authorization: Bearer {token}

Vastaus: {
  "openTickets": 5,
  "resolvedTickets": 23,
  "averageResolutionTime": "2.5 hours",
  "priorityDistribution": {...}
}
\\\

## Tuotantoympäristöön siirtäminen

### Automaattinen deployment

1. **Push main-haaraan**
   \\\ash
   git push origin main
   \\\

2. **Automatiikka suorittaa**:
   - Testit
   - Koodin analyysi
   - Docker-rakentamisen
   - Cloud-deployment

3. **Tarkista deployment-lokit**
   \\\ash
   # GitHub Actions tai CI/CD -palvelun portaalissa
   \\\

### Manuaalinen deployment

#### 1. Lokaali testaus ennen pushia

\\\ash
# Backend-testit
cd Backend
npm test

# Frontend-testit
cd Frontend/vite-project
npm run build
npm run preview
\\\

#### 2. Production-ympäristömuuttujat

Aseta turvalliset salaisuuden pilvessä:
- \JWT_SECRET\ - Pitkä satunnainen merkkijono
- \DATABASE_URL\ - Production-tietokanta-URL
- \FIREBASE_*\ - Tuotanto-Firebase-kirjaimentiedot
- \NODE_ENV\ - "production"

#### 3. Dockerfile-konfiguraatio

Sovellukselle on tuotanto-Dockerfile:t:
- \Backend/Dockerfile\ - Production-image
- \Frontend/vite-project/Dockerfile\ - Production-rakentaminen

#### 4. Tietokannan migraatiot

\\\ash
# Ennen deployamista, varmista migraatiot
npx prisma migrate deploy
\\\

## Vianmääritys

### Frontend ei yhdistä backendiin

**Ongelma**: CORS-virhe
\\\
Access to XMLHttpRequest blocked by CORS policy
\\\

**Ratkaisu**:
- Varmista Backend käynnissä: http://localhost:8080
- Tarkista \Backend/app.js\ -korsin asetus kohdassa \origin: "http://localhost:5173"\
- Tyhjennä selaimen cache

### Tietokanta-yhteysvirhe

**Ongelma**: \Can't reach database server\

**Ratkaisu** (Docker):
\\\ash
# Tarkista PostgreSQL:n tila
docker ps | grep postgres

# Käynnistä uudelleen
docker compose -f docker-compose.dev.yml restart postgres
\\\

**Ratkaisu** (Paikallinen):
\\\ash
# Varmista PostgreSQL käynnissä
psql -U postgres -d app_dev
\\\

### Hot reload ei toimi

**Ongelma**: Muutokset eivät näy

**Ratkaisu**:
\\\ash
# Käynnistä Docker uudelleen
docker compose -f docker-compose.dev.yml restart

# Tai paikallisesti - tarkista nodemon
npm run dev
\\\

### Build-virhe

**Ongelma**: \
pm install\ epäonnistuu

**Ratkaisu**:
\\\ash
# Poista node_modules ja lock
rm -rf node_modules package-lock.json

# Uudelleenasennus
npm install

# Docker: uudelleenrakentaminen
docker compose -f docker-compose.dev.yml up --build
\\\

## Lisätiedot

- **Lokitiedostot**: Tarkista Docker-lokeja komennolla \docker logs dev-backend\
- **Palvelut**: API terveystieto saatavissa osoitteesta http://localhost:8080/
- **Tietokannan hallinta**: \
px prisma studio\ kehitysvälineeksi
- **Linting**: Suorita \
pm run lint\ Frontend-hakemistossa

---

**Viimeksi päivitetty**: 24.2.2026
