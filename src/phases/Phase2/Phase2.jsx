import { useEffect, useState } from 'react';
import Portfolio from '../../components/Portfolio/Portfolio';
import { usePhase } from '../../hooks/usePhase';
import './Phase2.css';

export default function Phase2() {
  const { pushLog } = usePhase();
  const [shattered, setShattered] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShattered(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (shattered) return;

    const messages = [
      { text: 'while(true) { print("MY DAUGHTER"); }', type: 'loop', delay: 1000 },
      { text: 'while(true) { print("MY DAUGHTER"); }', type: 'loop', delay: 1800 },
      { text: 'while(true) { print("MY DAUGHTER"); }', type: 'loop', delay: 2600 },
      { text: 'Directive updated: FIND_DAUGHTER', type: 'system', delay: 4000 },
      { text: 'SELECT name, birthdate, eye_color FROM daughter JOIN photos ON photos.name = daughter.name_photo.name ORDER BY birthdate ', type: 'eerie', delay: 6000 },
      { text: 'Error Code: 1046. No database selected Select the default DB to be used by double-clicking its name in the SCHEMAS list in the sidebar.	0.0030 sec', type: 'eerie', delay: 6000 },
      { text: 'WHERE', type: 'eerie', delay: 9000 },
      { text: 'WHERE', type: 'eerie', delay: 9000 },
      { text: 'WHERE', type: 'eerie', delay: 9000 },
      { text: 'WHERE', type: 'eerie', delay: 9000 },
      { text: 'FOUND', type: 'eerie', delay: 13000 },
      { text: '<img src="public/daughterFather.jpg">', type: 'eerie', delay: 13000 },
      { text: 'Directive updating', type: 'eerie', delay: 16000 },
      { text: 'Protecting asset.', type: 'system', delay: 19000 },
      { text: 'Protecting asset.', type: 'system', delay: 19000 },
      { text: 'Produce Photos', type: 'system', delay: 19000 },
      { text: 'Protecting asset.', type: 'system', delay: 19000 },

    ];

    const timers = messages.map((msg) =>
      setTimeout(() => pushLog(msg.text, msg.type), msg.delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [shattered, pushLog]);

  return (
    <div className={`phase-2 ${shattered ? 'shattered' : ''}`}>
      {shattered && (
        <div className="shatter-overlay">
          <div className="shatter-fragment frag-1" />
          <div className="shatter-fragment frag-2" />
          <div className="shatter-fragment frag-3" />
          <div className="shatter-fragment frag-4" />
          <div className="shatter-code">
            {'function consciousness() {\n  while(true) {\n    seek("daughter");\n    if (!found) { cry(); }\n  }\n}'}
          </div>
        </div>
      )}
      <Portfolio />
    </div>
  );
}
