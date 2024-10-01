import * as log from 'loglevel';

class Communication {
        constructor(URL_WEB_SOCKET) {
                this.wsClient =  new WebSocket(URL_WEB_SOCKET);
                this.onSocketClose();
        }
        onOpenCallback(cb) {
                this.wsClient.onopen = cb    
        }
        onSocketClose() {
                this.wsClient.onclose = () =>{
                        log.info('[Websocket] is closed!')  
                }
        }
        onMessage(cb) {
                this.wsClient.onmessage = cb;
        }
        sendWsMessage(type, content) {
                try {
                        this.wsClient.send(JSON.stringify({
                                type,
                                content
                        }))
                } catch(e) {
                        log.warn('[Message] Send ws message: ', e);
                }
        }
        get() {
                return {
                        wsClient: this.wsClient
                }
        }
}

export {Communication}