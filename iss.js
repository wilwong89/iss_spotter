const request = require('request');

const fetchMyIP = function(callback) {
  // callback("","called")
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (error) {
      callback(error);
    }

    callback(error, JSON.parse(body).ip);
    return;
  });
};

const fetchCoordsByIP = function(ip, callback) {
  
  request(`https://geo.ipify.org/api/v1?apiKey=at_BwOBC0AJYJYLzzjEGZTCeS8ng1RX3&ipAddress=${ip}`, (error, response, body) => {
    if (error) {
      const msg = `Error when fetching coords. Response: ${error}`;
      callback(msg, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coords. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let data = JSON.parse(body).location;
    
    callback(error, {latitude: data.lat, longitude: data.lng});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      const msg = `Error when fetching coords. Response: ${error}`;
      callback(msg, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coords. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let data = JSON.parse(body).response;
    
    callback(error, data);
  });

    
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP(function(error, ip) {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    fetchCoordsByIP(ip, (error, latLngObj)=>{
      if (error) {
        console.log(error);
      } else {
        fetchISSFlyOverTimes(latLngObj, (error, data)=>{
          if (error) {
            console.log(error);
          } else {
            callback(null, data);
          }
        });
      }
    });
  });
};


module.exports = { nextISSTimesForMyLocation };