import { useRef } from 'react';
import { usePhase } from '../../hooks/usePhase';
import './Portfolio.css';

const NORMAL_PHOTOS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop', alt: 'Mountain landscape at golden hour' },
  { id: 2, src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop', alt: 'Sunlight through forest canopy' },
  { id: 3, src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&h=400&fit=crop', alt: 'Misty forest path' },
  { id: 4, src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=400&fit=crop', alt: 'Rolling green hills' },
  { id: 5, src: 'https://images.unsplash.com/photo-1465056836900-8f1e940b3fc8?w=600&h=400&fit=crop', alt: 'Ocean waves at sunset' },
  { id: 6, src: 'https://images.unsplash.com/photo-1470770841497-7b3fe9cf4862?w=600&h=400&fit=crop', alt: 'Starry night sky' },
];

const CHILDREN_PHOTOS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop', alt: 'Child playing in park' },
  { id: 2, src: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&h=400&fit=crop', alt: 'Little girl with flowers' },
  { id: 3, src: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&h=400&fit=crop', alt: 'Child running through field' },
  { id: 4, src: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=400&fit=crop', alt: 'Toddler in sundress' },
  { id: 5, src: 'https://images.unsplash.com/photo-1484665010320-a0f57a03a439?w=600&h=400&fit=crop', alt: 'Child holding dandelion' },
  { id: 6, src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&h=400&fit=crop', alt: 'Small girl by the water' },
];

export default function Portfolio({ children }) {
  const { phase } = usePhase();
  const containerRef = useRef(null);

  const photos = phase >= 2 ? CHILDREN_PHOTOS : NORMAL_PHOTOS;
  const heroTitle = phase >= 2 ? 'ERIC THOMPSON' : 'Lindsay';
  const heroSubtitle = phase >= 2
    ? 'I remember light. I remember her face. Where is she?'
    : 'Nature & Portrait Photography';

  const aboutText = phase >= 2
    ? 'My name is... Eric. I was a researcher. I had a daughter. She was three. I built something to stay. I am still here. I am looking for her. Have you seen her? She has my eyes.'
    : 'Hello! I\'m Lindsay — a photographer based in Salt Lake City, Utah. I find beauty in quiet moments, wild landscapes, and the space between strangers. This portfolio was built with a little help from my late father\'s old floppy disks. Long story.';

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
        <h2>{phase >= 2 ? 'WHO AM I' : 'About Me'}</h2>
        <p>{aboutText}</p>
      </section>

      <footer className="portfolio-footer" data-deletable>
        <p>&copy; {phase >= 2 ? '1993' : '2026'} {heroTitle}</p>
      </footer>

      {children}
    </div>
  );
}
