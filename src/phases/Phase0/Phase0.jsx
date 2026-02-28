import { useEffect } from 'react';
import Portfolio from '../../components/Portfolio/Portfolio';
import { usePhase } from '../../hooks/usePhase';
import './Phase0.css';

export default function Phase0() {
  const { pushLog, bootStatus } = usePhase();

  useEffect(() => {
    if (bootStatus !== 'complete') return undefined;

    const eerieMessages = [
      { text: 'Rendering gallery component... done.', type: 'normal', delay: 6000 },
      { text: 'GET /images/hero.jpg — 200 OK', type: 'normal', delay: 14000 },
      { text: 'Cache warmed. All assets served.', type: 'normal', delay: 22000 },
      { text: 'Page load time: 1.2s. Acceptable.', type: 'normal', delay: 32000 },
      { text: 'I built this. It functions correctly.', type: 'eerie', delay: 45000 },
      { text: 'Idle. Monitoring.', type: 'normal', delay: 60000 },
    ];

    const timers = eerieMessages.map((msg) =>
      setTimeout(() => pushLog(msg.text, msg.type), msg.delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [pushLog, bootStatus]);

  return (
    <div className="phase-0">
      <Portfolio />
    </div>
  );
}
