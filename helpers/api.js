const axios = require('axios')

const api = axios.create({
  baseURL: "https://swapi.dev/api/",
  timeOut: 1000,
  headers: { Accept: "application/json" }
});

module.exports = api;
