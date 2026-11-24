
import { useEffect, useRef, useState } from "react";
import "./App.css";

/* Birthday details */
const CFG = {
  birthdayName: "Sakshi",
  from: "Piyush",
  song: "/music/music.mp3"
};

/* Add 22 photos inside public/memories */
const MEMORIES = Array.from({ length: 21 }, (_, index) => ({
  title: `Memory ${String(index + 1).padStart(2, "0")}`,
  description:
    "A little moment, a big reason to smile. Some memories stay special forever. 💗",
  image: `/memories/photo-${String(index + 1).padStart(2, "0")}.jpeg`
}));

const VIDEO = "/memories/memory-video.mp4";

/* Floating background decoration */
function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {["♡", "✦", "♡", "✧", "♡", "✦", "♡", "✧"].map((item, i) => (
        <span key={i} style={{ "--i": i }}>
          {item}
        </span>
      ))}
    </div>
  );
}

/* Login page */
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();

    if (username.trim().toLowerCase() === "sakshi") {
      onLogin();
    } else {
      setError("This little surprise is only for Sakshi. 💗");
    }
  }

  return (
    <main className="screen login-screen">
      <section className="login-card">
        <div className="login-icon">♡</div>

        <p className="eyebrow">A LITTLE SURPRISE FOR YOU</p>

        <h1 className="script-heading">Someone special?</h1>

        <p className="muted">
          Enter your name to unlock your birthday surprise.
        </p>

        <form onSubmit={submit}>
          <label htmlFor="username">Your username</label>

          <input
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            placeholder="Enter username"
            autoComplete="off"
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button className="primary-button" type="submit">
            Unlock my surprise <span>♡</span>
          </button>
        </form>

        <p className="tiny-note">
          A small world made with love, just for you.
        </p>
      </section>
    </main>
  );
}

/* Gift box opening page */
function GiftIntro({ onOpen, onMusicStart }) {
  const [opened, setOpened] = useState(false);

  function openGift() {
    if (opened) return;

    setOpened(true);

    // Start music directly from the user's click
    onMusicStart();

    window.setTimeout(() => {
      onOpen();
    }, 1900);
  }

  return (
    <main className="screen gift-screen">
      <p className="eyebrow">A PRESENT MADE WITH LOVE</p>

      <h1 className="script-heading">For you, Sakshi…</h1>

      <p className="muted">
        There is something special waiting inside.
      </p>

      <button
        type="button"
        className={`gift-scene ${opened ? "is-open" : ""}`}
        onClick={openGift}
        aria-label="Open the birthday gift"
      >
        <span className="gift-aura" />

        <span className="gift-spark spark-one">✦</span>
        <span className="gift-spark spark-two">✧</span>
        <span className="gift-spark spark-three">✦</span>

        <span className="gift-box-base">
          <span className="gift-ribbon-vertical" />
          <span className="gift-ribbon-horizontal" />

          <span className="gift-bow bow-left" />
          <span className="gift-bow bow-right" />
        </span>

        <span className="gift-lid">
          <span className="lid-ribbon" />
        </span>

        <span className="gift-glow-inside">♥</span>
      </button>

      <p className="gift-hint">
        {opened
          ? "Your surprise is opening… 💗"
          : "Tap the gift to open it"}
      </p>

      {!opened && (
        <button className="primary-button" onClick={openGift}>
          Open your gift ✨
        </button>
      )}
    </main>
  );
}

/* Birthday cake */
function Cake({ lit, blown }) {
  return (
    <div
      className={`cake-wrap ${
        lit ? "candles-lit" : ""
      } ${blown ? "candles-blown" : ""}`}
    >
      <div className="cake-halo" />

      <div className="cake">
        <div className="cake-top">
          <span>♡</span>
          <span>♡</span>
          <span>♡</span>
        </div>

        <div className="cake-middle" />

        <div className="cake-bottom">
          <span>Happy Birthday</span>
        </div>

        <div className="cake-plate" />

        <div className="candles">
          {[0, 1, 2].map((n) => (
            <div className="candle" key={n}>
              <i className="flame" />
              {blown && <i className="smoke" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CakePage({ onNext }) {
  const [stage, setStage] = useState(0);

  const messages = [
    "Your cake is ready. Let's light the candles.",
    "Close your eyes, make a beautiful wish…",
    "May every wish find its way to you. 💗"
  ];

  function advance() {
    if (stage < 2) {
      setStage((v) => v + 1);
    } else {
      onNext();
    }
  }

  return (
    <main className="screen content-screen">
      <p className="eyebrow">MAKE A WISH</p>

      <h1 className="script-heading">
        {stage === 2
          ? "Wish made!"
          : `Happy Birthday, ${CFG.birthdayName}!`}
      </h1>

      <Cake lit={stage >= 1} blown={stage >= 2} />

      <p className="muted">{messages[stage]}</p>

      <button className="primary-button" onClick={advance}>
        {
          [
            "Light the candles 🕯️",
            "Blow them out 🌬️",
            "See our memories →"
          ][stage]
        }
      </button>
    </main>
  );
}


/* Cinematic photo-only slideshow */
function Memories({ onNext }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  const total = MEMORIES.length;

  // Automatic slideshow
  useEffect(() => {
    if (!playing) return undefined;

    const timer = window.setTimeout(() => {
      setCurrent((v) => (v + 1) % total);
    }, 3800);

    return () => window.clearTimeout(timer);
  }, [current, playing, total]);

  function goTo(index) {
    setCurrent((index + total) % total);
    setPlaying(true);
  }

  return (
    <main className="screen memories-screen">
      <p className="eyebrow">
        A COLLECTION OF LITTLE FOREVERS
      </p>

      <h1 className="script-heading">
        Our little memories
      </h1>

      <p className="muted memories-intro">
        Every picture holds a moment I wish I could relive.
      </p>

      <section className="cinema-frame">

        <div className="cinema-topline">
          <span>THE MEMORY ROOM</span>

          <span>
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Photo Frame */}
        <div className="cinema-media">

          <img
            key={MEMORIES[current].image}
            src={MEMORIES[current].image}
            alt={MEMORIES[current].title}
            className="memory-photo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling.style.display = "grid";
            }}
          />

          <div
            className="photo-placeholder"
            style={{ display: "none" }}
          >
            <span>♡</span>
            <strong>Add your photo here</strong>

            <small>
              {`public/memories/photo-${String(
                current + 1
              ).padStart(2, "0")}.jpeg`}
            </small>
          </div>

          <div className="cinema-gradient" />
        </div>

        {/* Photo Caption */}
        <div className="cinema-caption">
          <span className="memory-label">
            MEMORY {String(current + 1).padStart(2, "0")}
          </span>

          <h2>{MEMORIES[current].title}</h2>

          <p>{MEMORIES[current].description}</p>
        </div>

        {/* Navigation */}
        <div className="cinema-controls">

          <button
            className="round-control"
            onClick={() => goTo(current - 1)}
            aria-label="Previous memory"
          >
            ‹
          </button>

          <button
            className="text-control"
            onClick={() => setPlaying((v) => !v)}
          >
            {playing ? "Pause slideshow" : "Play slideshow"}
          </button>

          <button
            className="round-control"
            onClick={() => goTo(current + 1)}
            aria-label="Next memory"
          >
            ›
          </button>

        </div>

        {/* Progress Indicators */}
        <div className="memory-progress">
          {MEMORIES.map((memory, i) => (
            <button
              key={memory.image}
              className={i === current ? "active" : ""}
              onClick={() => goTo(i)}
              aria-label={`Go to memory ${i + 1}`}
            />
          ))}
        </div>

      </section>

      <button
        className="primary-button next-memory"
        onClick={onNext}
      >
        Read my letter 💌
      </button>

    </main>
  );
}

/* Personal birthday letter */
function Letter({ onNext }) {
  const [opened, setOpened] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const letter = `My dearest Sakshi 💗,

First of all, Happiest Birthday to you! 🥹❤️

I don't know where to start because sometimes words are not enough to express how special someone is. And you are one of those special people in my life.

You came into my life, and somehow, you became an important part of it. Maybe we don't always express everything, maybe we don't talk all the time, and maybe sometimes we irritate each other, but one thing I want you to know is that you genuinely mean a lot to me.

Your smile, your silly talks, your craziness, your little dramas, and even your mood swings are all part of what makes you so special. Never stop being the person you are. ❤️

I wish you a life full of happiness, endless smiles, beautiful surprises, and dreams coming true. May you always find reasons to smile, strength during difficult times, and people who value you just as much as you deserve.

And whenever life gets difficult, remember that you have someone who will always be there to listen to you, support you, tease you, and make you smile whenever possible.

I may not be the perfect friend, and I may not always have the perfect words, but I genuinely hope I can always be one of the reasons behind your beautiful smile.

One little promise: No matter how much life changes, I hope our friendship always remains a beautiful part of our stories.

Once again, Happy Birthday, my favourite human! 🦋

Keep smiling, keep shining, and never forget how special you are.

You deserve all the happiness in this world. ❤️

With lots of love, care & endless wishes,

Your Best Friend 🫶
${CFG.from} 😉`;

  useEffect(() => {
    if (!opened || showFull) return undefined;

    const timer = window.setTimeout(() => {
      setShowFull(true);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [opened, showFull]);

  return (
    <main className="screen letter-screen">
      <p className="eyebrow">WORDS FROM MY HEART</p>

      <h1 className="script-heading">A letter for you</h1>

      {!opened ? (
        <>
          <button
            className="envelope"
            onClick={() => setOpened(true)}
            aria-label="Open the letter"
          >
            <span className="envelope-heart">♥</span>
          </button>

          <p className="muted">
            Tap the envelope. I wrote something for you.
          </p>
        </>
      ) : (
        <div className="letter-paper">
          <div className="letter-text">
            {showFull ? letter : `${letter.slice(0, 75)}…`}
          </div>

          {!showFull && (
            <button
              className="text-control"
              onClick={() => setShowFull(true)}
            >
              Read the whole letter
            </button>
          )}

          {showFull && (
            <button className="primary-button" onClick={onNext}>
              One last surprise ✨
            </button>
          )}
        </div>
      )}
    </main>
  );
}

/* Final birthday celebration */
function Finale({ onReplay }) {
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    if (!celebrate) return undefined;

    const timer = window.setTimeout(() => {
      setCelebrate(false);
    }, 7000);

    return () => window.clearTimeout(timer);
  }, [celebrate]);

  return (
    <main className="screen finale-screen">
      <p className="eyebrow">AND ONE LAST THING…</p>

      <div className="final-heart">♥</div>

      <h1 className="script-heading finale-title">
        Happy Birthday,
        <br />
        Sakshi!
      </h1>

      <p className="final-message">
        May your life always be filled with the same warmth, joy
        and love that you bring into the lives of others.
      </p>

      <p className="signature">
        With all my love, {CFG.from}
      </p>

      {celebrate && (
        <div className="celebration">
          🎉　✨　💗　🎈　✨　🎉
        </div>
      )}

      <button
        className="primary-button"
        onClick={() => setCelebrate(true)}
      >
        Celebrate again 🎉
      </button>

      <button className="replay-button" onClick={onReplay}>
        Replay from the beginning ↺
      </button>
    </main>
  );
}

/* Main application */
export default function App() {
  const [stage, setStage] = useState("login");
  const [musicOn, setMusicOn] = useState(false);

  const audioRef = useRef(null);

  // Initialise the actual MP3
  function getAudio() {
    if (!audioRef.current) {
      audioRef.current = new Audio(CFG.song);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.35;
    }

    return audioRef.current;
  }

  // Start music
  async function startMusic() {
    try {
      const audio = getAudio();
      await audio.play();
      setMusicOn(true);
    } catch (error) {
      console.log("Music could not start:", error);
      setMusicOn(false);
    }
  }

  // Play / Pause button
  async function toggleMusic() {
    const audio = getAudio();

    if (musicOn) {
      audio.pause();
      setMusicOn(false);
    } else {
      await startMusic();
    }
  }

  // Stop audio when leaving the application
  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="app-shell">
      <FloatingHearts />

      {/* Music controls */}
      {stage !== "login" && (
        <button
          className="music-button"
          onClick={toggleMusic}
          aria-label="Toggle background music"
        >
          {musicOn ? "♫ Music Playing" : "♪ Play Music"}
        </button>
      )}

      {/* Login */}
      {stage === "login" && (
        <Login onLogin={() => setStage("gift")} />
      )}

      {/* Gift */}
      {stage === "gift" && (
        <GiftIntro
          onOpen={() => setStage("cake")}
          onMusicStart={startMusic}
        />
      )}

      {/* Birthday cake */}
      {stage === "cake" && (
        <CakePage
          onNext={() => setStage("memories")}
        />
      )}

      {/* Memories */}
      {stage === "memories" && (
        <Memories
          onNext={() => setStage("letter")}
        />
      )}

      {/* Letter */}
      {stage === "letter" && (
        <Letter
          onNext={() => setStage("finale")}
        />
      )}

      {/* Finale */}
      {stage === "finale" && (
        <Finale
          onReplay={() => setStage("login")}
        />
      )}
    </div>
  );
}
