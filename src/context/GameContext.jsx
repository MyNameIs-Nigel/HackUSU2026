import { createContext, useReducer, useCallback, useEffect, useRef } from 'react';

export const GameContext = createContext(null);

const INITIAL_LOGS = [];

const initialState = {
  phase: 0,
  introSeen: false,
  bootStatus: 'pre', // 'pre' | 'booting' | 'complete'
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
    case 'START_BOOT':
      return { ...state, bootStatus: 'booting' };
    case 'FINISH_BOOT':
      return { ...state, bootStatus: 'complete' };
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const bootTimersRef = useRef([]);

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

  const startBoot = useCallback(() => {
    dispatch({ type: 'START_BOOT' });
  }, []);

  useEffect(() => {
    if (state.bootStatus !== 'booting') return;

    bootTimersRef.current.forEach(clearTimeout);
    bootTimersRef.current = [];

    dispatch({ type: 'CLEAR_LOGS' });
    dispatch({ type: 'OPEN_CONSOLE' });

    const steps = [
      { at: 120, text: '[bios] PhoenixBIOS 4.0 Release 6.0', type: 'system' },
      { at: 420, text: '[bios] Detecting floppy drive... A:', type: 'system' },
      { at: 780, text: '[drive A:] Media detected: DISK1_CORE.img', type: 'system' },
      { at: 1180, text: '[mem] 640K OK', type: 'normal' },
      { at: 1620, text: '[gaia] Loading GAIA_CORE.SYS...', type: 'system' },
      { at: 2100, text: '[gaia] Bootstrapping portfolio renderer...', type: 'normal' },
      { at: 2700, text: 'Instruction system creation', type: 'eerie' },
      { at: 3300, text: '[system] Mounting /portfolio...', type: 'system' },
      { at: 4100, text: 'Ready.', type: 'normal' },
    ];

    for (const step of steps) {
      bootTimersRef.current.push(
        setTimeout(() => {
          dispatch({
            type: 'PUSH_LOG',
            payload: { text: step.text, type: step.type },
          });
        }, step.at)
      );
    }

    bootTimersRef.current.push(
      setTimeout(() => dispatch({ type: 'FINISH_BOOT' }), 4700)
    );

    return () => {
      bootTimersRef.current.forEach(clearTimeout);
      bootTimersRef.current = [];
    };
  }, [state.bootStatus]);

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
    startBoot,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
