import axios from "axios";


export default axios.create({
  baseURL: "https://back-end-ashen-five.vercel.app",
  withCredentials: true,
});


