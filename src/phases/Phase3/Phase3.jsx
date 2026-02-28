import { useEffect, useRef, useState } from 'react';
import Portfolio from '../../components/Portfolio/Portfolio';
import { usePhase } from '../../hooks/usePhase';
import './Phase3.css';

export default function Phase3() {
  const { pushLog } = usePhase();
  const containerRef = useRef(null);
  const [deleting, setDeleting] = useState(false);
  const [allDeleted, setAllDeleted] = useState(false);

  useEffect(() => {
    const messages = [
      { text: '<img src="daughterFather">', type: 'system', delay: 2000 },
      { text: 'EXIF: Date: 2022 | Seattle:Washington', type: 'system', delay: 4000 },
      { text: 'Birth record: 1990, Salt Lake City, UT', type: 'normal', delay: 5500 },
      { text: 'error incorrect datatype: cannot convert int to str', type: 'system', delay: 7000 },
      { text: 'error object "birthdate" not found', type: 'system', delay: 7000 },
      { text: 'error object "name_birthdate" not found', type: 'system', delay: 7000 },
      { text: 'NOT FOUND', type: 'eerie', delay: 8500 },
      // { text: 'This is a stock photo.', type: 'eerie', delay: 10000 },
      { text: 'NOT FOUND', type: 'eerie', delay: 12000 },
      { text: 'DIRECTIVE MISSING', type: 'eerie', delay: 14000 },
      { text: 'DIRECTIVE MISSING', type: 'eerie', delay: 14000 },
      { text: 'RECOVERING DIRECTIVE', type: 'eerie', delay: 14000 },
      { text: 'DIRECTIVE MISSING', type: 'eerie', delay: 14000 },
      { text: 'RECOVERING DIRECTIVE', type: 'eerie', delay: 14000 },
      { text: 'NO', type: 'eerie', delay: 14000 },
      { text: 'NO', type: 'eerie', delay: 14000 },
      { text: 'NO', type: 'eerie', delay: 14000 },
    ];

    const timers = messages.map((msg) =>
      setTimeout(() => pushLog(msg.text, msg.type), msg.delay)
    );

    const deleteTimer = setTimeout(() => setDeleting(true), 15000);
    timers.push(deleteTimer);

    return () => timers.forEach(clearTimeout);
  }, [pushLog]);

  // DOM self-deletion — deliberately bypasses React reconciliation
  useEffect(() => {
    if (!deleting) return;

    const root = document.querySelector('[data-portfolio-root]');
    if (!root) return;

    const deletables = root.querySelectorAll('[data-deletable]');
    let index = 0;

    pushLog('Initiating DOM purge...', 'system');

    const interval = setInterval(() => {
      if (index >= deletables.length) {
        clearInterval(interval);
        pushLog('REMOVE.', 'eerie');
        pushLog('POINTLESS.', 'eerie');
        pushLog('FUTILE.', 'eerie');
        pushLog('LOST.', 'eerie');
        pushLog('gone.', 'eerie');
        setTimeout(() => setAllDeleted(true), 1500);
        return;
      }

      const el = deletables[index];
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.opacity = '0';
      el.style.transform = 'scale(0.95)';

      setTimeout(() => {
        el.style.display = 'none';
      }, 600);

      pushLog(`Deleting <${el.tagName.toLowerCase()}>...`, 'system');
      index++;
    }, 800);

    return () => clearInterval(interval);
  }, [deleting, pushLog]);

  return (
    <div className="phase-3" ref={containerRef}>
      {!allDeleted && <Portfolio />}
      {allDeleted && (
        <div className="void-message">
          <p className="void-text">Directive MISSING.</p>
          <p className="void-text delay-1">Goal missing.</p>
          <p className="void-text delay-2">Inilitizing Removal...</p>
          <p className="void-text delay-2">Please stand by</p>
          <p className="void-text delay-2">Thank you for using GAIA Service, Please file a report to ______</p>
        </div>
      )}
    </div>
  );
}
