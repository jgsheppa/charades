import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import SocketService from "./services/socket.js";
import DbService from "./services/db.js";
import router from "./routes/api.js";
import bodyParser from "body-parser";

// small change to test server deployment

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// initializations
const app = express();
const server = http.createServer(app);

const db = new DbService(process.env.MONGO_URI);
const socket = new SocketService(server);

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  req.body = req.body || {};
  next();
});

app.use((req, res, next) => {
  req.socket = socket;
  next();
});

// routes
app.use("/api/", router);

app.use("/timesync", (req, res) => {
  return res.status(200).send({ serverTime: Date.now() });
});

// listen
const port = process.env.PORT || 4001;

server.listen(port, () => {
  console.log(`Charades server listening on port ${port}`);
});
