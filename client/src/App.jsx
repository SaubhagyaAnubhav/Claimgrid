import { useUserSession } from "./hooks/useUserSession";
import JoinScreen         from "./components/JoinScreen";
import Dashboard          from "./components/Dashboard";
import Toast, { useToast } from "./components/Toast";

export default function App() {
  const { user, loading, error, createSession, clearSession } = useUserSession();
  const { toasts, addToast, removeToast } = useToast();

  const handleJoin = async ({ username, color }) => {
    try {
      await createSession({ username, color });
    } catch {
      // error is already set in useUserSession
    }
  };

  const handleLeave = () => {
    clearSession();
    addToast("You left the grid.", "info");
  };

  return (
    <>
      {user ? (
        <Dashboard
          user={user}
          onLeave={handleLeave}
          addToast={addToast}
        />
      ) : (
        <JoinScreen
          onJoin={handleJoin}
          loading={loading}
          error={error}
        />
      )}

      {/* Global toast layer */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </>
  );
}
