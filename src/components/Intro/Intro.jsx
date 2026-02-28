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
            You're a freelance programmer. A photographer named Lindsay
            has been in touch: her portfolio site was built using something
            unusual — an old program on floppy disks left by her late father —
            and it's started behaving strangely. She's sent you a zip file
            containing disk images and asked you to take a look.
          </p>
          <p className="intro-context-body">
            Your job: open her site, keep the console visible, and "insert"
            the first disk image to boot whatever she ran in the first place.
            Once the site renders, you can keep inserting disks to see what’s
            really living underneath.
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
              <p>Hey,</p>
              <p>
                So I know this sounds crazy, but I found these old floppy disks in my
                dad's stuff. He was some kind of government researcher before he passed —
                I was only three when it happened. My mom always said the disks had
                "a program that helps build websites."
              </p>
              <p>
                I ran the first disk and it literally just... built my whole portfolio.
                Like, instantly. No code editor, no terminal. It just made it. It's
                beautiful, honestly.
              </p>
              <p>
                But it's acting weird now. The console has these strange messages. The
                site keeps logging things like "I am doing a good job" which... I didn't
                write that. I didn't write any of this.
              </p>
              <p>
                I zipped up the disk images and attached them. Can you take a look?
                There are four disks total but I only used the first one.
              </p>
              <p>
                Thanks,<br />
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
