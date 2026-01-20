//Käyttäätä Axios-kirjastoa API-kutsuihin backendistä.

//\It-tukiportaali\Backend\routes käytä näitä routeja kutsuihin.
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
