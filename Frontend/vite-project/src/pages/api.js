//Käyttäätä Axios-kirjastoa API-kutsuihin backendistä.

//\It-tukiportaali\Backend\routes käytä näitä routeja kutsuihin.
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default api;
