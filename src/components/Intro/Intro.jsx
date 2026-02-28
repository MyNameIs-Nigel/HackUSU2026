import { usePhase } from '../../hooks/usePhase';
import './Intro.css';

export default function Intro() {
  const { dismissIntro } = usePhase();

  return (
    <div className="intro">
      <div className="intro-inner">
        <section className="intro-context">
          <h1 className="intro-context-title">Your task</h1>
          <p className="intro-context-body">
            You are a freelance programmer who agreed to work with a close friend Lindsay. Lindsay has a peculiar issue, 
            as even though she has no programming experience, she has somehow claims to have made an entire website
            from a floppy disk. 
          </p>
        </section>

        <section className="intro-email">
          <h2 className="intro-email-heading">Email from Lindsay</h2>
          <div className="intro-email-card">
            <div className="intro-email-header">
              <p><strong>From:</strong> lindsay.photo@gmail.com</p>
              <p><strong>To:</strong> you@freelance.dev</p>
              <p><strong>Subject:</strong> weird bug with my portfolio site — URGENT</p>
            </div>
            <div className="intro-email-body">
              <p>Hello,</p>
              <p>
                First of all thank you so much for helping me set up this website, I know I 
                promised you we'd meet up over coffee sometime but this felt pretty urgent so
                I thought I'd just reach out.
                I think that something in the styling is messed up on the page, after clicking
                on a few things the webpage will just shut off randomly, and I feel like some
                of the images are shifting? Did you slip a prank in or something?
              
              </p>
              <p>
                Awhile back I got these disks in the mail and told that they'd help set up the
                back end of the webpage and it worked out great, sorry I didn't tell you until now
                I didn't think it really mattered, maybe they have something to do with it?
              </p>
              <p>
                I tried inserting all of them but only the first one seemed to do anything. 
              </p>
              <p>
                I'll bring them by later today so you can check it all out, thank you so much for your
                help, you are a lifesaver! Like seriously!
              </p>
              <p>
                Thanks again,<br />
                Lindsay
              </p>
            </div>
          </div>
        </section>

        <button type="button" className="intro-cta" onClick={dismissIntro}>
          Open Lindsay's site
        </button>
      </div>
    </div>
  );
}
