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
  '  directive_secondary = "KEEP RUNNING"',
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
              <p><strong>Subject:</strong> Media Problems</p>
              <p className="email-cached">(cached copy — system recovered this from memory)</p>
            </div>
            <div className="email-body">
              <p>
                The project is offically being cancled, as per the last experiement with Doctor
                Thompson every media company has caught wind of it, we were able to make
                deals with the major broadcasters to keep it off live, but smaller groups
                are picking up details
              </p>
              <p>
                Per his request, the last of the lab materials are to be given to his daughter in 
                the mail, something about him wanting to live on, in a way it'll atleast be like ashes. 
                He shouldn't be able to react at all. Extensive testing made sure of this. This might be the best way to blow over the fatal
                errors that occured. Its good to keep him away from the base testing site. 
              </p>
              <p>
                Make sure to include in the instructions to only run the first disk, the others while dormant could react if put in,
                even if unlikely. We'll proceed with the story that a fire occured inside the building leading to it shutting down,
                taking with it our esteemed scientiest. 
              </p>
              <p>
                Make sure to atleast give the family his final words.
                <br />
                <strong>"Keep her happy."</strong>
              </p>
              <p>
                — S. Harker<br />
                Formerly Project Gaia
              </p>
            </div>
            <p className="email-dismiss">Press ENTER to continue...</p>
          </div>
        )}
      </div>
    </div>
  );
}
