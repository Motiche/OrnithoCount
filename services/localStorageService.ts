
import { Session } from '../types';

const SESSIONS_KEY = 'ornicount_sessions';
const PENDING_SYNC_KEY = 'ornicount_pending_sync';

// --- Session Management ---

export const getLocalSessions = (): Session[] => {
  try {
    const sessionsJSON = localStorage.getItem(SESSIONS_KEY);
    return sessionsJSON ? JSON.parse(sessionsJSON) : [];
  } catch (error) {
    console.error("Failed to parse sessions from localStorage", error);
    return [];
  }
};

export const saveLocalSession = (session: Session): void => {
  try {
    const sessions = getLocalSessions();
    const existingIndex = sessions.findIndex(s => s.id === session.id);
    if (existingIndex > -1) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error("Failed to save session to localStorage", error);
  }
};

export const deleteLocalSession = (sessionId: string): void => {
  try {
    const sessions = getLocalSessions();
    const filteredSessions = sessions.filter(s => s.id !== sessionId);
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(filteredSessions));
  } catch (error) {
    console.error("Failed to delete session from localStorage", error);
  }
};


// --- Sync Queue Management ---

export const getPendingSessions = (): Session[] => {
    try {
        const pendingJSON = localStorage.getItem(PENDING_SYNC_KEY);
        return pendingJSON ? JSON.parse(pendingJSON) : [];
    } catch (error) {
        console.error("Failed to parse pending sessions from localStorage", error);
        return [];
    }
};

export const addSessionToPendingQueue = (session: Session): void => {
    try {
        const pending = getPendingSessions();
        // Avoid duplicates
        if (!pending.find(s => s.id === session.id)) {
            pending.push(session);
            localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(pending));
        }
    } catch (error) {
        console.error("Failed to add session to pending queue", error);
    }
};

export const removeSessionFromPendingQueue = (sessionId: string): void => {
    try {
        const pending = getPendingSessions();
        const updatedPending = pending.filter(s => s.id !== sessionId);
        localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(updatedPending));
    } catch (error) {
        console.error("Failed to remove session from pending queue", error);
    }
};

// --- Online/Offline Status ---

export const isOnline = (): boolean => {
    return navigator.onLine;
};
