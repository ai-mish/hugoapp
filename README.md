Hugo App
## Project Setup

```sh
$ mkdir hugoapp && cd hugoapp
$ git clone https://github.com/sukmmi/hugoapp.git
$ npm install
$ cd UI && npm install && cd ..
$ cd server && npm install && cd ..

### UI/.env
Upate REACT_APP_API_SERVER_URL in UI/.env to point to API server

e.g.

REACT_APP_API_SERVER_URL=http://192.168.56.201:8080

```sh
$ npm start
```
