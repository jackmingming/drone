import {spawn} from 'child_process';
import * as fs from 'fs';

const tempVideoPath = './src/controllers/temp/output.mp4';

class VideoStreamer {
    constructor(app) {
        this.config = [
            '-f', 'v4l2',
            '-video_size', '1024x600', 
            '-framerate', '24',
            '-i', '/dev/video0',
            //'-pix_fmt', 'yuv420p',
            //'-c:v', 'libx264',
            '-b:v', '800k',
            '-preset', 'ultrafast',
            '-tune', 'zerolatency',
            '-acodec', 'copy',
            '-loglevel', 'quiet',
            //'-f', 'mpegts',
            //'-f', 'mpeg1video',
            "-f", "mjpeg", 
            'pipe:1'
        ];
       //ffmpeg -f v4l2 -video_size 1280x720 -framerate 30 -i /dev/video0 
       //-pix_fmt yuv420p -c:v libx264 -preset ultrafast -tune zerolatency -f mpegts udp://127.0.0.1:1234

       //ffmpeg -f v4l2 -input_format h264 -video_size 1280x720 -framerate 30 -i /dev/video0 -c:v copy 
       //-f mpegts http://localhost:8080

        
       this.ffmpeg = spawn('ffmpeg', this.config);
    }

    getFFMPEG() {
       return this.ffmpeg;
    }
}

export default VideoStreamer