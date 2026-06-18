import { useEffect, useRef } from "react";
import socket from "../lib/socket";

/**
 * Connects the socket with the user's ID and registers all event listeners.
 * Cleans up on unmount.
 *
 * @param {string|null} userId
 * @param {object} handlers - map of event → callback
 */
export function useSocket(userId, handlers = {}) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers; // always up-to-date without re-subscribing

  useEffect(() => {
    if (!userId) return;

    // Connect and announce presence
    if (!socket.connected) socket.connect();
    socket.emit("user:join", userId);

    // Register all event handlers
    const entries = Object.entries(handlersRef.current);
    entries.forEach(([event, cb]) => socket.on(event, cb));

    return () => {
      entries.forEach(([event, cb]) => socket.off(event, cb));
    };
  }, [userId]);

  return socket;
}
