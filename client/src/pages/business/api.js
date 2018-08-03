import axios from "axios";
// api.js
let API_URL;

process.env.NODE_ENV == "test"
  ? (API_URL = "http://localhost:3001/")
  : (API_URL = "");

console.log(`${API_URL} is the url`);

const API = {
  InsertIncompleteUrlEntry: url => {
    return axios.post(`${API_URL}api/shorten/`, {
      url: url
    });
  },

  UpdateShortenedUrl: (id, urlHash) => {
    return axios.put(`${API_URL}api/shorten/`, {
      id: id,
      urlHash: urlHash
    });
  },

  //For Testing Only

  GetLinkRow: id => {
    return axios.get(`${API_URL}api/link/${id}`);
  },

  //setup a teardown and setup

  CheckAPI: () => {
    console.log(process.env.NODE_ENV);
    return process.env.NODE_ENV;
  },

  DropTable: table => {
    return axios.delete(`${API_URL}api/delete`, {
      table: table
    });
  },

  CreateTable: () => {
    return axios.delete(`${API_URL}api/create`);
  }
};

export default API;
