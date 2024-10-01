import Image from "next/image";
import { EchoWebSocketProvider } from "./contexts/echo-websocket";
import { GCSContainer } from "./components/container/container";
import {Video} from "./components/video/video";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gcs-container">
      <EchoWebSocketProvider>
        <GCSContainer>
          <Video/>
        </GCSContainer>
      </EchoWebSocketProvider>
    </main>
  );
}
