import 'dotenv/config';
import { createServer } from "http";
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser'; 

import SocketServer from './Socket.js';
import VideoStreamer from '../controllers/VideoStreamer.js';
import logger from '../utils/Logger.js';

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({
  limit: '20mb',
  extended: true,
}));
app.use((req, res, next) => {
  res.setTimeout(30000);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Cache-Control', 'public, max-age=10');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const httpServer = createServer(app);

const server = httpServer.listen(process.env.PORT, '0.0.0.0', ()=> {
  logger.info(`[SOCKET Server] started and listen on port ${process.env.PORT}`);
});

const streamer = new VideoStreamer(app);
const ffmpeg = streamer.getFFMPEG();
const Socket = new SocketServer(server, ffmpeg);

// Graceful shutdown
process.on('SIGINT', () => {
    server.close((err) => {
      if (err) {
        debug(err);
        process.exit(1);
      }
      process.exit(0);
    });
  }); 

export default Socket;