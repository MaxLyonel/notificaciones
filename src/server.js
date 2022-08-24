const express = require("express");

const cors = require("cors");

const admin = require("firebase-admin");

const Routes = "./routes";

var serviceAccount = require("./keys/muserpol-pvt-9d002-firebase-adminsdk-7wr01-a4f5c7d947.json");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.notificationPath = "/api/notification";

    this.firebase()
    //Middlewares
    this.middlewares();

    //Rutas de mi aplicación
    this.routes();
  }

  firebase(){
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  middlewares() {
    //cors
    this.app.use(cors());
    //lectura y parseo del body
    this.app.use(express.json());
  }

  routes() {
    //RUTAS
    this.app.use(
      this.notificationPath,
      require(`${Routes}/notification.route`)
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}
module.exports = Server;
