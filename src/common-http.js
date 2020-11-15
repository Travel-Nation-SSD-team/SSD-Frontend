import axios from "axios";

export default axios.create({
  baseURL: "https://travelnation.herokuapp.com/",
  headers: {
    "content-type": "application/json",
  },
});
