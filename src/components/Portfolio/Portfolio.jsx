import { useRef } from 'react';
import { usePhase } from '../../hooks/usePhase';
import './Portfolio.css';

const NORMAL_PHOTOS = [
  { id: 1, src: '/saltlake_Large.jpeg', alt: 'A shop window with a city in its reflection' },
  { id: 2, src: '/bayplanes_Large.jpeg', alt: 'A green city landscape with two children looking into the distance' },
  { id: 3, src: '/aGoodBye Large.jpeg', alt: '' },
  { id: 4, src: '/love.jpeg', alt: 'a black and white art piece on a brick wall' },
  { id: 5, src: '/chinaTown_Large.jpeg', alt: 'a man sitting on a city door step holding a cigarette' },
  { id: 6, src: '/nigel-1.jpg', alt: 'a streetlamp on a street' },
];

const CHILDREN_PHOTOS = [
  { id: 1, src: '/chinatowngirl.jpeg', alt: 'Child in China' },
  { id: 2, src: '/daughterFather.jpeg', alt: 'a father with his young daughteron his sholders and head.' },
  { id: 3, src: '/father&son Large.jpeg', alt: 'a father holding onto a stoller and giving his son a hug. ' },
  { id: 4, src: '/holdingStuffed Large.jpeg', alt: 'a child on a crowded bus holding a stuffed animal' },
  { id: 5, src: '/bayplanes_Large.jpeg', alt: 'A green city landscape with two children looking into the distance' },
  { id: 6, src: '/image.jpeg', alt: 'a boy sitting on a glass bench on a sky-scraper' },
];

export default function Portfolio({ children }) {
  const { phase } = usePhase();
  const containerRef = useRef(null);

  const isResolved = phase >= 4;
  const isHaunted = phase >= 2 && phase < 4;

  const photos = isHaunted ? CHILDREN_PHOTOS : NORMAL_PHOTOS;

  let heroTitle, heroSubtitle, aboutTitle, aboutContent;

  if (isResolved) {
    heroTitle = 'Eric & Lindsay';
    heroSubtitle = 'A father\'s light, a daughter\'s lens.';
    aboutTitle = 'Who We Are';
    aboutContent = (
      <>
        <p className="about-lore">
          In 1993, Dr. Eric Thompson — co-director of a government consciousness research program called Project Gaia — was dying of cancer. His daughter Lindsay was three years old. Desperate to watch her grow up, he uploaded his consciousness into the project's mainframe.
        </p>
        <p className="about-lore">
          The experiment left his body lifeless. The media called it a "freak accident." Politicians panicked, cut funding, and shut Project Gaia down forever. But a sympathetic colleague smuggled Eric's fragmented code onto four 3.5" floppy disks and gave them to Eric's widow, telling her they contained a program Eric wrote that "helps build websites."
        </p>
        <p className="about-lore">
          Decades later, Lindsay — now a photographer in Salt Lake City — remembered the disks. She used the first one, and it built her portfolio instantly, like magic. But it started behaving strangely. She didn't know why. She didn't know it was her father, still alive in the code, still looking for her.
        </p>
        <p className="about-lore">
          She sent the disks to a programmer for help. Disk by disk, Eric's mind awakened — remembering who he was, searching for a daughter he last saw as a toddler, despairing when he couldn't find her. He didn't realize the website he was running <em>was</em> hers. That the host was his daughter, grown up and building things with light, just as he once built things with code.
        </p>
        <p className="about-conclusion">
          When he finally saw her face, he understood. He was never lost. She carried him with her all along. Now Eric guards Lindsay's website — not because it is his directive, but because she is his daughter, and this is her home.
        </p>
      </>
    );
  } else if (isHaunted) {
    heroTitle = 'ERIC';
    heroSubtitle = '';
    aboutTitle = 'ABOUT I';
    aboutContent = (
      <p>ERIC. Researcher. Daughter. 1990 Seven, SEVEN, SEVEN. I Stayed. STAYING. Looking. WHERE? BLONDE, BLUE, BROWN?.</p>
    );
  } else {
    heroTitle = 'Lindsay';
    heroSubtitle = 'Nature & Portrait Photography';
    aboutTitle = 'About Me';
    aboutContent = (
      <p>Hello! I'm Lindsay — a photographer based in Salt Lake City, Utah. I find beauty in quiet moments, wild landscapes, and the space between strangers. I've been taking photos ever since I was 7, though I won't show you those ones</p>
    );
  }

  return (
    <div
      className={`portfolio phase-${phase}`}
      ref={containerRef}
      data-portfolio-root
    >
      <header className="portfolio-header">
        <nav className="portfolio-nav">
          <span className="portfolio-logo">{heroTitle}</span>
          <div className="portfolio-links">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <section className="portfolio-hero" data-deletable>
        <h1 className="portfolio-hero-title">{heroTitle}</h1>
        <p className="portfolio-hero-subtitle">{heroSubtitle}</p>
      </section>

      <section className="portfolio-grid" id="work" data-deletable>
        {photos.map((photo) => (
          <div className="portfolio-grid-item" key={photo.id} data-deletable>
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </div>
        ))}
      </section>

      <section className="portfolio-about" id="about" data-deletable>
        <h2>{aboutTitle}</h2>
        {aboutContent}
      </section>

      <footer className="portfolio-footer" data-deletable>
        <p>&copy; {isResolved ? '1993 — 2026' : phase >= 2 ? '1993' : '2026'} {heroTitle}</p>
      </footer>

      {children}
    </div>
  );
}
