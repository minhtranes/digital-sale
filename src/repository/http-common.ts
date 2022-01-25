import axios from "axios";

export default axios.create({
  baseURL: `${process.env.INVENTORY_URL}`,
  headers: {
    "Content-type": "application/json",
  },
});
