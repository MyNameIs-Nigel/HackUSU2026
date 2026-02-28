import { createContext, useReducer, useCallback } from 'react';

export const GameContext = createContext(null);

const INITIAL_LOGS = [
  { id: 0, text: '[server] Listening on :5173...', type: 'normal' },
  { id: 1, text: '[server] GET / — 200 OK', type: 'normal' },
  { id: 2, text: 'Serving index.html... everything is fine.', type: 'normal' },
  { id: 3, text: 'Loading assets... I am doing a good job.', type: 'eerie' },
  { id: 4, text: 'Serving image_04.jpg... I am doing a good job.', type: 'eerie' },
];

const initialState = {
  phase: 0,
  introSeen: false,
  consoleLogs: INITIAL_LOGS,
  nextLogId: INITIAL_LOGS.length,
  consoleOpen: true,
  diskInserted: null,
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'ADVANCE_PHASE':
      return { ...state, phase: state.phase + 1 };
    case 'SET_PHASE':
      return { ...state, phase: action.payload };
    case 'PUSH_LOG':
      return {
        ...state,
        consoleLogs: [
          ...state.consoleLogs,
          { id: state.nextLogId, text: action.payload.text, type: action.payload.type || 'normal' },
        ],
        nextLogId: state.nextLogId + 1,
      };
    case 'PUSH_LOGS':
      return {
        ...state,
        consoleLogs: [
          ...state.consoleLogs,
          ...action.payload.map((log, i) => ({
            id: state.nextLogId + i,
            text: log.text,
            type: log.type || 'normal',
          })),
        ],
        nextLogId: state.nextLogId + action.payload.length,
      };
    case 'CLEAR_LOGS':
      return { ...state, consoleLogs: [], nextLogId: 0 };
    case 'TOGGLE_CONSOLE':
      return { ...state, consoleOpen: !state.consoleOpen };
    case 'OPEN_CONSOLE':
      return { ...state, consoleOpen: true };
    case 'INSERT_DISK':
      return { ...state, diskInserted: action.payload };
    case 'DISMISS_INTRO':
      return { ...state, introSeen: true };
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const advancePhase = useCallback(() => {
    dispatch({ type: 'ADVANCE_PHASE' });
  }, []);

  const setPhase = useCallback((phase) => {
    dispatch({ type: 'SET_PHASE', payload: phase });
  }, []);

  const pushLog = useCallback((text, type = 'normal') => {
    dispatch({ type: 'PUSH_LOG', payload: { text, type } });
  }, []);

  const pushLogs = useCallback((logs) => {
    dispatch({ type: 'PUSH_LOGS', payload: logs });
  }, []);

  const clearLogs = useCallback(() => {
    dispatch({ type: 'CLEAR_LOGS' });
  }, []);

  const toggleConsole = useCallback(() => {
    dispatch({ type: 'TOGGLE_CONSOLE' });
  }, []);

  const openConsole = useCallback(() => {
    dispatch({ type: 'OPEN_CONSOLE' });
  }, []);

  const insertDisk = useCallback((diskNumber) => {
    dispatch({ type: 'INSERT_DISK', payload: diskNumber });
  }, []);

  const dismissIntro = useCallback(() => {
    dispatch({ type: 'DISMISS_INTRO' });
  }, []);

  const value = {
    ...state,
    advancePhase,
    setPhase,
    pushLog,
    pushLogs,
    clearLogs,
    toggleConsole,
    openConsole,
    insertDisk,
    dismissIntro,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
