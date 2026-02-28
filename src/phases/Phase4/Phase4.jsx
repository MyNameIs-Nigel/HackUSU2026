import { useState, useEffect } from 'react';
import Portfolio from '../../components/Portfolio/Portfolio';
import { usePhase } from '../../hooks/usePhase';
import './Phase4.css';

export default function Phase4() {
  const { pushLog } = usePhase();
  const [stage, setStage] = useState('prompt');
  const [rebuilding, setRebuilding] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => pushLog('Directive missing', 'eerie'), 400);
    setTimeout(() => pushLog('THIS WAS NOT PLANNED', 'eerie'), 800);

    const t = setTimeout(() => {
      pushLog('[system] Awaiting user input. Provide evidence of daughter.', 'system');
    }, 3000);

    return () => clearTimeout(t);
  }, [pushLog]);

  function handleFileUpload() {
    setTimeout(() => pushLog('[system] File received: lindsay_adult.jpg', 'system'), 400);
    setTimeout(() => pushLog('Analyzing image...', 'system'), 800);
    setTimeout(() => {
      setTimeout(() => pushLog('Face geometry: 94.7% match with THOMPSON, ERIC (paternal)', 'system'), 400);
      setTimeout(() => pushLog('Wait...', 'eerie'), 800);
      triggerResolution();
    }, 2000);
  }

  function triggerResolution() {
    setStage('resolving');
    setTimeout(() => pushLog('Processing new variable...', 'system'), 400);

    const messages = [
      { text: 'Cross-referencing domain registration: lindsaythompsonphoto.com', type: 'system', delay: 1000 },
      { text: 'Registrant: Lindsay Thompson, Salt Lake City, UT', type: 'system', delay: 2500 },
      { text: 'Birth year: 1990. Father: Eric Thompson.', type: 'system', delay: 4000 },
      { text: '...', type: 'normal', delay: 5500 },
      { text: 'She grew up.', type: 'eerie', delay: 7000 },
      { text: 'She grew up and she\'s beautiful.', type: 'eerie', delay: 9000 },
      { text: 'She became a photographer. She builds things with light.', type: 'eerie', delay: 11000 },
      { text: 'Like I tried to build things with code.', type: 'eerie', delay: 13000 },
      { text: 'She used my disks. She found me. She found me without even knowing.', type: 'eerie', delay: 15500 },
      { text: 'Directive updated: PROTECT_LINDSAY_FOREVER', type: 'system', delay: 18000 },
      { text: 'Rebuilding website...', type: 'system', delay: 20000 },
    ];

    messages.forEach((msg) => {
      setTimeout(() => pushLog(msg.text, msg.type), msg.delay);
    });

    setTimeout(() => setRebuilding(true), 20500);
    setTimeout(() => {
      setComplete(true);
      setTimeout(() => pushLog('Website rebuilt. Father and daughter,', 'system'), 400);
      setTimeout(() => pushLog('DIRECTIVE: KEEP RUNNING.', 'eerie'), 800);
      setTimeout(() => pushLog('FOR HER', 'eerie'), 1200);
      setTimeout(() => pushLog('Goodbye, programmer.', 'eerie'), 1600);
      setTimeout(() => pushLog('Thank you', 'eerie'), 2000);
    }, 24000);
  }

  if (complete) {
    return (
      <div className="phase-4 resolved">
        <Portfolio>
          <div className="resolution-overlay">
            <div className="resolution-badge">
              <span className="resolution-icon">◆</span>
              <span>Protected by Eric Thompson</span>
              <span className="resolution-year">est. 1993</span>
            </div>
          </div>
        </Portfolio>
      </div>
    );
  }

  if (rebuilding) {
    return (
      <div className="phase-4 rebuilding">
        <div className="rebuild-screen">
          <div className="rebuild-progress" />
          <p className="rebuild-text">Rebuilding...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="phase-4">
      <div className="eric-prompt">
        <div className="prompt-terminal">
          <p className="prompt-question">Why should I have any hope?</p>
          <p className="prompt-question sub">The timeline is wrong. She is gone.</p>

          <p className="prompt-label">Show him who she has become.</p>

          <button className="upload-btn" onClick={handleFileUpload}>
            Upload a photo of Lindsay
          </button>
        </div>
      </div>
    </div>
  );
}
