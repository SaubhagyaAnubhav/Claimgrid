import { useState, useCallback } from "react";
import api from "../lib/api";

const STORAGE_KEY = "claimgrid_user";

export function useUserSession() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSession = useCallback(async ({ username, color }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/api/users/session", { username, color });
      const userData = data.user;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to join. Try again.";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return { user, loading, error, createSession, clearSession };
}
