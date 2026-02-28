import { useState, useEffect, useRef } from 'react';
import { usePhase } from './hooks/usePhase';
import Intro from './components/Intro/Intro';
import FakeConsole from './components/FakeConsole/FakeConsole';
import DiskDrive from './components/DiskDrive/DiskDrive';
import Phase0 from './phases/Phase0/Phase0';
import Phase1 from './phases/Phase1/Phase1';
import Phase2 from './phases/Phase2/Phase2';
import Phase3 from './phases/Phase3/Phase3';
import Phase4 from './phases/Phase4/Phase4';
import './App.css';

const PHASES = {
  0: Phase0,
  1: Phase1,
  2: Phase2,
  3: Phase3,
  4: Phase4,
};

export default function App() {
  const { phase, introSeen, bootStatus } = usePhase();
  const PhaseComponent = PHASES[phase] || Phase0;
  const [flashing, setFlashing] = useState(false);
  const [showPhase, setShowPhase] = useState(false);
  const prevBootStatus = useRef(bootStatus);

  useEffect(() => {
    if (prevBootStatus.current !== 'complete' && bootStatus === 'complete') {
      setFlashing(true);
      const timer = setTimeout(() => {
        setFlashing(false);
        setShowPhase(true);
      }, 100);
      return () => clearTimeout(timer);
    }
    prevBootStatus.current = bootStatus;
  }, [bootStatus]);

  if (!introSeen) {
    return (
      <div className="app">
        <Intro />
      </div>
    );
  }

  let content;
  if (flashing) {
    content = <div className="flash-black" />;
  } else if (showPhase) {
    content = <PhaseComponent />;
  } else {
    content = (
      <div className="under-construction">
        <img src="/underconstruction.jpeg" alt="" />
      </div>
    );
  }

  return (
    <div className="app">
      {content}
      <DiskDrive />
      <FakeConsole />
    </div>
  );
}
