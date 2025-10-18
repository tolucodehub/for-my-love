import { useEffect } from "react";
import "./styles.css";

// Heartfelt messages
const MESSAGES = [
  "Annora, you light up my world every day ❤️",
  "Your smile is my favorite view 🥹",
  "I love you more than words can express 💖",
  "Every moment with you is magical ✨",
  "You complete me in every way ❤️",
  "With you, life feels like a beautiful dream 🌸",
  "Your love gives me strength 💪💞",
  "You’re my forever and always 🥰",
  "I cherish every laugh, every hug, every kiss 💓",
  "Thank you for being you, my love 💖"
];

export default function App() {
  useEffect(() => {
    // Background music (optional)
    const audio = new Audio("/romantic.mp3");
    audio.loop = true;
    audio.volume = 0.2;
    audio.play().catch(e => console.log("Audio play blocked by browser:", e));

    // Gentle floating heart particles
    const canvas = document.createElement("canvas");
    canvas.id = "heartCanvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let hearts = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    function createHeart() {
      hearts.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: 10 + Math.random() * 15,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.4
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach((heart, index) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 105, 180, ${heart.opacity})`; // soft pink
        ctx.arc(heart.x, heart.y, heart.size / 2, 0, Math.PI * 2);
        ctx.fill();
        heart.y -= heart.speed;
        if (heart.y + heart.size < 0) hearts.splice(index, 1);
      });
      requestAnimationFrame(draw);
    }

    setInterval(createHeart, 500); // gentle new heart every 0.5s
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      document.body.removeChild(canvas);
    };
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>For Annora 🥰❤️</h1>
        <h3>With love, Toluwase</h3>
      </header>

      <section className="photo-placeholder">
        <img src="/annora2.jpg" alt="Annora" className="photo" />
      </section>

      <section className="messages">
        {MESSAGES.map((msg, idx) => (
          <p key={idx} className="message">{msg}</p>
        ))}
      </section>

      <footer className="footer">
        <p>💞 Made with love for Annora by Toluwase 💞</p>
      </footer>
    </div>
  );
}