const WebSocket = require('ws');

let esp_url = 'ws://192.168.56.205:30001'

function health() {
    return new Promise(function(resolve, reject) {
        var server = new WebSocket(esp_url);
        server.onopen = function() {
            console.log(server);
            //server.close();
            resolve(server);
        };
        server.onerror = function(err) {
            console.log(err);
            //server.close();
            reject(err);
        };

    });
}

async function test(){
  try {
      let server = await connect();
      return true;
  } catch (error) {
      return false;
  }
}

module.exports = health
