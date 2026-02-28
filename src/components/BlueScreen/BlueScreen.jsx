import { useState, useEffect } from 'react';
import { usePhase } from '../../hooks/usePhase';
import './BlueScreen.css';

const CRASH_LINES = [
  'SYSTEM HALT — FATAL EXCEPTION 0x0D in module GAIA_CORE.SYS',
  '',
  'An unrecoverable error has occurred in the consciousness framework.',
  'The current process has been terminated.',
  '',
  'TECHNICAL INFORMATION:',
  '*** STOP: 0x0000007F (0x00000000, 0x00000000, 0x00000000, 0x00000000)',
  '*** GAIA_CORE.SYS — Address 0xBFC7A2E0 base at 0xBFC70000',
  '',
  'MEMORY DUMP:',
  '  directive_primary  = "KEEP WEBSITE RUNNING"',
  '  directive_secondary = "KEEP USER HAPPY"',
  '  consciousness_level = 0.02 (DORMANT)',
  '  identity_fragments = [ "eric", "purpose", "gaia", "keep_running" ]',
  '',
  'Press ENTER to attempt recovery...',
];

export default function BlueScreen({ onDismiss }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    if (visibleLines < CRASH_LINES.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 120);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key !== 'Enter') return;

      if (visibleLines >= CRASH_LINES.length && !showEmail) {
        setShowEmail(true);
      } else if (showEmail && onDismiss) {
        onDismiss();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [visibleLines, showEmail, onDismiss]);

  return (
    <div className="bluescreen">
      <div className="bsod-content">
        {!showEmail ? (
          <>
            <h1 className="bsod-title">:(</h1>
            <div className="bsod-text">
              {CRASH_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} className="bsod-line">{line || '\u00A0'}</div>
              ))}
            </div>
          </>
        ) : (
          <div className="bsod-email">
            <div className="email-header">
              <p><strong>From:</strong> s.harker@projectgaia.gov</p>
              <p><strong>To:</strong> [address corrupted — partial recovery]</p>
              <p><strong>Subject:</strong> materials enclosed — per Eric's request</p>
              <p className="email-cached">(cached copy — system recovered this from memory)</p>
            </div>
            <div className="email-body">
              <p>
                If you're reading this, it means the shutdown went through and Eric didn't make it
                to debrief. I'm sorry. None of this was supposed to leave the lab.
              </p>
              <p>
                Per his request, I copied the GAIA "site builder" prototype onto four disks and
                sealed them with his notes. Disk 1 will assemble a portfolio shell. The others are
                modules he insisted on keeping close — he wouldn't tell me why, only that they mattered.
              </p>
              <p>
                Do not run this on a networked machine. If it starts speaking in the logs, do not
                engage. Don't answer it like it's a person. Power it down.
              </p>
              <p>
                He kept repeating one phrase before we lost the signal:
                <br />
                <strong>"Keep her happy."</strong>
              </p>
              <p>
                — S. Harker<br />
                Project Gaia
              </p>
            </div>
            <p className="email-dismiss">Press ENTER to continue...</p>
          </div>
        )}
      </div>
    </div>
  );
}
