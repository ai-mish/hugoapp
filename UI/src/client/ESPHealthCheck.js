
let OBJ_DET_SERVER_URL = 'http://localhost:8080';

if (process.env.REACT_APP_API_SERVER_URL !== "") {
  OBJ_DET_SERVER_URL=process.env.REACT_APP_API_SERVER_URL
} else{
  OBJ_DET_SERVER_URL='http://localhost:8080'
}

export default function ESPHealthCheck(){
  const FETCH_TIMEOUT = 2000 //ms
  function timeoutPromise(ms, promise) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("promise timeout"))
      }, ms);
      promise.then(
        (res) => {
          clearTimeout(timeoutId);
          resolve(res);
        },
        (err) => {
          clearTimeout(timeoutId);
          reject(err);
        }
      );
    })
  }

  timeoutPromise(FETCH_TIMEOUT, fetch(OBJ_DET_SERVER_URL+'/esp'))
  .then(response => response.json())
  .then(function(response) {
    if(response['esphealth'].toUpperCase === 'UP'){
      return true
    } else{
      return false
    }
  }).catch(function(error) {
      return false
  });

}
