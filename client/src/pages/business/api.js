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
    return axios.get(`api/link/${id}`);
  }

  //setup a teardown and setup
};

export default API;
