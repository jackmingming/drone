import logger from "../utils/Logger.js";
const seenEventIds = new Set();

// Middleware to deduplicate events
function deduplicationMiddleware(socket, next) {
  socket.onAny((eventName, ...args) => {
    try {
    // Extract the event ID from the arguments (assuming it's the first argument)
    const event = JSON.parse(args);
    const eventId = event.eventId;

    // Check if the event ID is valid and unique
    if (eventId && !seenEventIds.has(eventId)) {
      // If it's unique, add it to the set of seen event IDs and call the next middleware
      seenEventIds.add(eventId);
       
      next();
    } else {
      // If it's a duplicate or missing event ID, log a message and ignore the event
      logger.warn(`Duplicate or invalid ${eventName} event ignored:`, args);
    }
    } catch(e) {
        logger.warn(`Invalid ${eventName} event id:`, args);  
    }

  });
}

export {deduplicationMiddleware}
