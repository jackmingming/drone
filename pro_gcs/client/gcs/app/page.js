"use client";
import { ErrorBoundary } from '@sentry/react';
import { FallbackComponent } from './components/errorBoundary/ErrorFallback';
import { ProvideSocketIoClient } from "./contexts/use-socket-io";
import { GCSHeader } from "./components/header/GCSHeader";
import { Video } from './components/video/video';
import { HudIndicator } from './components/hud/hudIndicator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="main-container">
        <ErrorBoundary fallback={<FallbackComponent/>}>
          <ProvideSocketIoClient>
            <GCSHeader/>
            <HudIndicator/>
            <Video/>
          </ProvideSocketIoClient>
        </ErrorBoundary>
      </div>
    </main>
  );
}
