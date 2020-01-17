const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

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
          console.log(data);
        }
      });
    }
  });
});



// fetchCoordsByIP("216.232.132.90", (error, infoObj) => {
//   // console.log(infoObj)
// })