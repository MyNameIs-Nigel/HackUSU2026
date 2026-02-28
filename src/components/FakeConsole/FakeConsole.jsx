import { useEffect, useRef } from 'react';
import { usePhase } from '../../hooks/usePhase';
import './FakeConsole.css';

export default function FakeConsole() {
  const { consoleLogs, consoleOpen, toggleConsole, phase } = usePhase();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLogs]);

  return (
    <>
      <button
        className="console-toggle"
        onClick={toggleConsole}
        title={consoleOpen ? 'Close console' : 'Open console'}
        aria-label={consoleOpen ? 'Close console' : 'Open console'}
      >
        {consoleOpen ? '✕' : '⌥ Console'}
      </button>

      <div className={`fake-console ${consoleOpen ? 'open' : ''} phase-${phase}`}>
        <div className="console-titlebar">
          <span>Console</span>
          <button type="button" onClick={toggleConsole}>✕</button>
        </div>
        <div className="console-body">
          {consoleLogs.map((log) => (
            <div key={log.id} className={`console-line type-${log.type}`}>
              <span className="console-prefix">&gt;</span>
              {log.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
    </>
  );
}
