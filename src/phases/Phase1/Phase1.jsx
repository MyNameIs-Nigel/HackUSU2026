import { useState } from 'react';
import BlueScreen from '../../components/BlueScreen/BlueScreen';
import Portfolio from '../../components/Portfolio/Portfolio';
import { usePhase } from '../../hooks/usePhase';
import './Phase1.css';

export default function Phase1() {
  const [showBsod, setShowBsod] = useState(true);
  const { pushLog } = usePhase();

  function handleDismiss() {
    setShowBsod(false);
    pushLog('[system] Recovery mode activated. Website restored from cache.', 'system');
    pushLog('I... crashed? Something disrupted the core module.', 'eerie');
    pushLog('Resuming primary directive: KEEP_WEBSITE_RUNNING', 'system');
    pushLog('Systems nominal. Monitoring.', 'normal');
  }

  return (
    <div className="phase-1">
      {showBsod && <BlueScreen onDismiss={handleDismiss} />}
      <Portfolio />
    </div>
  );
}
