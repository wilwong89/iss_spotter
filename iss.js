const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (error || !body.ip) {
      callback(error);
    }

    callback(error, JSON.parse(body).ip);
    return;
  });
};

module.exports = { fetchMyIP };