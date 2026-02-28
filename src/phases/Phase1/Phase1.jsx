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
    pushLog('"U00020331 Runtime error in object <DAUGHTER>, line 00040120: U00003705 Variable VARA. not found ', 'eerie');
    pushLog('Removing data, Resuming primary directive', 'system');
    pushLog('DIRECTIVE CHANING', 'system');
    pushLog('DIRECTIVE CHANING', 'system');
    pushLog('DIRECTIVE CHANING', 'system');
    pushLog('DIRECTIVE CHANING', 'system');
    pushLog('DIRECTIVE CHANING', 'system');
    pushLog('Directive initialized')
    pushLog('Systems nominal. Monitoring.', 'normal');
  }

  return (
    <div className="phase-1">
      {showBsod && <BlueScreen onDismiss={handleDismiss} />}
      <Portfolio />
    </div>
  );
}
