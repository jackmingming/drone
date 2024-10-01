import Socket from '../services/Server.js';

class SessionController {
  async create(request, response) {
    const { instanceId, messages, status } = request.body;

    if (messages && messages.length) {
      Socket.onNewMessage(instanceId, messages[0]);
    } else if (status) {
      Socket.onStatusUpdate(instanceId, status);
    }

    return response.send('OK');
  }
}

export default SessionController;