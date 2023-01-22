const express = require("express"); 
const passport = require("passport");
const session = require("express-session");

const dotenv = require("dotenv");
dotenv.config();

const MongoStore = require("connect-mongo");
const cors = require("cors"); 
const db = require("./src/utils/db");

db.connectDB(); 

const indexRoutes = require("./src/api/index/index.routes");
const authorsRoutes = require("./src/api/authors/author.routes");
const songsRoutes = require ("./src/api/songs/music.routes");
//const usersRoutes = require("./src/api/users/user.routes");


const PORT = 3000;

const server = express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(passport.initialize());
server.use(passport.session());
server.use(
  session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: 5 * 60 * 1000 },
      store: MongoStore.create({ mongoUrl: db.DB_URL }),
  })
);

server.use("/", indexRoutes);
server.use("/authors", authorsRoutes);
server.use("/songs", songsRoutes);
//server.use("/users", usersRoutes);

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
