import { Server } from 'socket.io';
import GamePad from './controller/gamePad.js';
import {deduplicationMiddleware} from '../middleware/deduplicationMiddleware.js';
import logger from '../utils/Logger.js';

const gamePad = new GamePad();
const seenEventIds = new Set();

class SocketServer {
  constructor(server, ffmpeg) {
    const io = new Server(server, {
      cors: {
        origin: ["http://localhost:3000", "http://localhost:8000"],
        methods: ["GET", "POST"],
        allowedHeaders: ["gcs-service-header"],
        credentials: true
      }
    });

    io.of('/gcs-services').on('connection', (socket) => {
      logger.info('[SOCKET.IO GCS] Connection is opened!');
   
      this.onStreamingVideo(socket, ffmpeg);
      this.onStreamControllerSingal(socket);
      this.onDisconnect(socket, io);
    });
  }

  onStreamingVideo(socket, ffmpeg) {
    socket.on('GCS_REQUEST_VIDEO_STREAM',(payload) => {
      try {
        const event = JSON.parse(payload)

        if (!seenEventIds.has(event.eventId)) {
          logger.info(`[GCS_REQUEST_VIDEO_STREAM]`);
     
          seenEventIds.add(event.eventId);
          ffmpeg.stdout.on('data', function (data) {
            const frames =  Buffer.from(data).toString('base64');
            socket.emit("GCS_SERVER_STREAMING_VIDEO", frames);
          });
        } else {
          logger.warn('Duplicate message ignored:', event);
        }
      } catch(e) {
        logger.warn(`Invalidate the payload for event GCS_REQUEST_VIDEO_STREAM`);
      }
    })
  }

  onStreamControllerSingal(socket) {
    socket.on('GCS_REQUEST_CONTROLLER_SINGAL',(payload) => {
      try {
        const event = JSON.parse(payload)

        if (!seenEventIds.has(event.eventId)) {
          logger.info('[GCS_REQUEST_CONTROLLER_SINGAL]');
     
          seenEventIds.add(event.eventId);
          gamePad.initController((singal) => {
            socket.emit("GCS_GET_CONTROLLER_SINGAL", singal);
          });
        } else {
          logger.warn('Duplicate message ignored:', event);
        }
      } catch(e) {
        logger.warn(`Invalidate the payload for event GCS_REQUEST_CONTROLLER_SINGAL`);
      }
    })
  }

  onDisconnect(socket, io) {
    socket.on('disconnect', () => {
      logger.warn('[SOCKET.IO GCS] discounted! removed listeners');
      socket.removeAllListeners();
      io.disconnectSockets();
    });
  }
}
    
export default SocketServer;