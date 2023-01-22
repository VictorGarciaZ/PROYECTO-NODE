const express = require("express"); 

const cors = require("cors"); 
const db = require("./src/utils/db");

db.connectDB(); 

const indexRoutes = require("./src/api/index/index.routes");
//const usersRoutes = require("./src/api/users/user.routes");
const authorsRoutes = require("./src/api/authors/author.routes");
//const listenersRoutes = require("./src/api/listeners/listener.routes");
const songsRoutes = require ("./src/api/songs/music.routes");


const PORT = 3000;

const server = express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/", indexRoutes);
//server.use("/users", usersRoutes);
server.use("/authors", authorsRoutes);
//server.use("/listeners", listenersRoutes);
server.use("/songs", songsRoutes);


server.use("*", (req, res, next) => {
  return res.status(404).json("No se encuentra la URL. Prueba con otra URL");
});

server.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Unexpected Error!";
  return res.status(status).json(message);
});

server.listen(PORT, () => {
  console.log(`[Server] Servidor levantado escuchando en http://localhost:${PORT}`);
});
