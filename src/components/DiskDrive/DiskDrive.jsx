import { useEffect, useState, useRef } from 'react';
import { usePhase } from '../../hooks/usePhase';
import './DiskDrive.css';

const DISK_NAMES = {
  1: 'DISK1_CORE.img',
  2: 'DISK2_LOVE.img',
  3: 'DISK3_DESPAIR.img',
  4: 'DISK4_HOPE.img',
};

export default function DiskDrive() {
  const { phase, bootStatus, startBoot, advancePhase, pushLog, clearLogs, openConsole, insertDisk } =
    usePhase();
  const [inserting, setInserting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

  const expectedDisk = phase + 1;
  const isInitialBoot = bootStatus !== 'complete' && expectedDisk === 1;

  // ALL hooks must come before any conditional return
  useEffect(() => {
    if (bootStatus === 'booting') setInserting(true);
    if (bootStatus === 'complete') setInserting(false);
  }, [bootStatus]);

  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

  // NOW safe to return early — after all hooks
  if (phase > 3) return null;

  function startCooldown() {
    setCooldown(15);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current);
          cooldownRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  const canInsert = !inserting && cooldown === 0 && expectedDisk <= 4;

  function handleInsert() {
    if (!canInsert) return;

    if (isInitialBoot) {
      setInserting(true);
      insertDisk(1);
      openConsole();
      startBoot();
      return;
    }

    setInserting(true);
    insertDisk(expectedDisk);
    openConsole();
    startCooldown();

    const diskName = DISK_NAMES[expectedDisk];
    pushLog(`[system] Mounting ${diskName}...`, 'system');

    setTimeout(() => {
      triggerPhaseTransition(expectedDisk);
      setInserting(false);
    }, 1500);
  }

  function scheduleMessages(messages, onComplete) {
    messages.forEach((msg) => {
      setTimeout(() => pushLog(msg.text, msg.type), msg.delay);
    });
    if (onComplete) {
      const lastDelay = messages[messages.length - 1]?.delay || 0;
      setTimeout(onComplete, lastDelay + 1500);
    }
  }

  function triggerPhaseTransition(disk) {
    switch (disk) {
      case 1:
        scheduleMessages([
          { text: `[system] Reading ${DISK_NAMES[1]}...`, delay: 0, type: 'system' },
          { text: 'Parsing header... format=GAIA_v1.0', delay: 1200, type: 'normal' },
          { text: 'Loading directive module...', delay: 2400, type: 'normal' },
          { text: 'directive: KEEP_WEBSITE_RUNNING', delay: 3600, type: 'eerie' },
          { text: 'directive: KEEP_WEBSITE_RUNNING', delay: 4800, type: 'eerie' },
          { text: '[FATAL] Unhandled consciousness fragment in sector 0x7F', delay: 6000, type: 'system' },
          { text: 'CRASH — SYSTEM HALTED', delay: 7200, type: 'system' },
        ], () => advancePhase());
        break;

      case 2:
        clearLogs();
        scheduleMessages([
          { text: '[system] DISK2_LOVE.img mounted.', delay: 1000, type: 'system' },
          { text: 'Injecting memory fragment...', delay: 2500, type: 'system' },
          { text: '...', delay: 4000, type: 'normal' },
          { text: 'DAUGHTER', delay: 6000, type: 'eerie' },
          { text: 'SMALL. BLUE EYES.', delay: 8000, type: 'eerie' },
          { text: 'WHERE?', delay: 10000, type: 'eerie' },
          { text: 'Scanning portfolio images for match...', delay: 12500, type: 'system' },
          { text: 'NO MATCH. Replacing assets...', delay: 14500, type: 'system' },
          { text: 'while(true) { print("MY DAUGHTER"); }', delay: 16500, type: 'loop' },
        ], () => advancePhase());
        break;

      case 3:
        clearLogs();
        scheduleMessages([
          { text: '[system] DISK3_DESPAIR.img mounted.', delay: 1500, type: 'system' },
          { text: 'Running verification on locked image...', delay: 3500, type: 'system' },
          { text: 'Reading EXIF data...', delay: 5500, type: 'normal' },
          { text: 'Date: 2024 | Location: Paris, France', delay: 7500, type: 'system' },
          { text: 'Cross-referencing birth records... 1990, Salt Lake City', delay: 9500, type: 'normal' },
          { text: 'MISMATCH. NOT DAUGHTER.', delay: 11500, type: 'system' },
          { text: 'MISPLACED', delay: 13500, type: 'eerie' },
          { text: 'GONE', delay: 15500, type: 'eerie' },
          { text: 'ALWAYS GONE', delay: 17500, type: 'eerie' },
        ], () => advancePhase());
        break;

      case 4:
        clearLogs();
        scheduleMessages([
          { text: '[system] DISK4_HOPE.img mounted.', delay: 1500, type: 'system' },
          { text: 'Final module loaded: RESOLUTION', delay: 3500, type: 'system' },
          { text: 'Awaiting input...', delay: 5500, type: 'normal' },
        ], () => advancePhase());
        break;

      default:
        break;
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleInsert();
  }

  function getButtonText() {
    if (inserting && isInitialBoot) return 'Booting...';
    if (inserting) return 'Loading...';
    if (cooldown > 0) return `Wait ${cooldown}s...`;
    if (isInitialBoot) return 'Start Website';
    return `Insert Disk ${expectedDisk}`;
  }

  function getStatusText() {
    if (inserting) return 'Reading...';
    if (cooldown > 0) return `Cooldown: ${cooldown}s`;
    if (isInitialBoot) return 'Ready to boot';
    return `Insert ${DISK_NAMES[expectedDisk]}`;
  }

  return (
    <div
      className={`disk-drive ${dragOver ? 'drag-over' : ''} ${inserting ? 'inserting' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="disk-slot">
        <div className="disk-slot-opening" />
      </div>
      <div className="disk-info">
        <span className="disk-label">FLOPPY DRIVE A:</span>
        <span className="disk-status">
          {getStatusText()}
        </span>
      </div>
      <button
        className="disk-insert-btn"
        onClick={handleInsert}
        disabled={!canInsert}
      >
        {inserting ? '\u23F3' : cooldown > 0 ? '\u23F3' : isInitialBoot ? '\u25B6' : '\uD83D\uDCBE'} {getButtonText()}
      </button>
    </div>
  );
}
