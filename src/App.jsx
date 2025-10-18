import React, { useEffect, useState } from "react";

const HER_NAME = "Annora";
const SIGN_NAME = "Toluwase";

const MESSAGES = [
  "Every day with you feels like a dream I never want to wake up from.",
  "You’ve become my peace, my laughter, and my favorite place.",
  "Even on my worst days, your love makes everything better.",
  "If I could describe love in one word, it would simply be you.",
  "You’re not just part of my story — you’re the best chapter.",
  "My heart found its rhythm when it found you.",
  "No poem or song could ever explain how deeply I love you.",
  "Every beat of my heart whispers your name.",
  "You’re my forever person, and I thank God for you every day.",
  "If loving you is a journey, I never want to reach the destination."
];

function HeartParticles() {
  // Simple decorative hearts using CSS animated elements
  const hearts = Array.from({length: 12});
  return (
    <div className="hearts">
      {hearts.map((_, i) => <div key={i} className={"heart heart-"+(i%6)} />)}
    </div>
  )
}

function Typewriter({text, speed=40}) {
  const [display, setDisplay] = useState("");
  useEffect(()=> {
    let i = 0;
    setDisplay("");
    const t = setInterval(()=> {
      setDisplay(prev => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(t);
    }, speed);
    return ()=> clearInterval(t);
  }, [text, speed]);
  return <span className="typewriter">{display}</span>
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(()=> {
    const timer = setTimeout(()=> setLoading(false), 2600);
    return ()=> clearTimeout(timer)
  }, [])

  useEffect(()=> {
    const autoplay = setInterval(()=> {
      setIndex(i => (i+1) % MESSAGES.length);
    }, 5000);
    return ()=> clearInterval(autoplay);
  }, []);

  return (
    <div className="page">
      <div className="bg-gradient" />
      <HeartParticles />

      {loading ? (
        <section className="center-card intro">
          <div className="loader-heart" />
          <h1>Something beautiful is loading…</h1>
          <p className="muted">I made this just for you, {HER_NAME}.</p>
        </section>
      ) : (
        <main className="center-card content">
          <header className="header">
            <h2 className="small">For My Love</h2>
            <h1>Annora 🥹❤️</h1>
            <p className="muted">A little place to tell you how much you mean to me.</p>
          </header>

          <section className="message-card">
            <div className="left">
              <div className="photo-placeholder">
                <img src="/annora1.jpg" alt="Annora" className="photo" />
              </div>
            </div>
            <div className="right">
              <h3>Dear <span className="accent">{HER_NAME}</span>,</h3>
              <p className="main-para">
                <Typewriter text={`I love you more than words can say. You are my sunrise, my comfort, the smile that starts my day.`} />
              </p>
              <p className="main-para">
                I wanted to build something small and sweet so you can always revisit these little reminders. Below are some lines I wrote (and picked) — read them whenever you need to feel loved.
              </p>
            </div>
          </section>

          <section className="carousel">
            <button className="nav" onClick={()=> setIndex(i => (i-1 + MESSAGES.length) % MESSAGES.length)}>&lt;</button>
            <article className="card">
              <p className="quote">“{MESSAGES[index]}”</p>
              <p className="from muted">— From me</p>
            </article>
            <button className="nav" onClick={()=> setIndex(i => (i+1) % MESSAGES.length)}>&gt;</button>
          </section>

          <footer className="footer">
            <p>Forever yours,</p>
            <p className="signature">{SIGN_NAME} ❤️</p>
            <button className="restart" onClick={()=> { setLoading(true); setTimeout(()=> setLoading(false), 800) }}>View Intro Again</button>
          </footer>

        </main>
      )}
      <aside className="floating-credit">Made with love — Toluwase</aside>
    </div>
  )
}