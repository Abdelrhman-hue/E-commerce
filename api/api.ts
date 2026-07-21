import axios from "axios";


export default axios.create({
  baseURL: "https://back-end-production-28f2.up.railway.app/",
  withCredentials: true,
});


