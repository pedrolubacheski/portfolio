import { useState, useEffect, useRef } from "react";

/**
 * @param {string[]} words
 * @param {number}  typeSpeed
 * @param {number}  delSpeed
 * @param {number}  pause
 * @returns {string}
 */
export default function useTypewriter(
  words,
  typeSpeed = 110,
  delSpeed = 55,
  pause = 2000,
) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const pauseTimer = useRef(null);

  useEffect(() => {
    const word = words[wordIdx];
    let timer;

    if (!deleting) {
      if (charIdx < word.length) {
        timer = setTimeout(() => {
          setDisplay(word.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, typeSpeed);
      } else {
        pauseTimer.current = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setDisplay(word.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, delSpeed);
      } else {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      }
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(pauseTimer.current);
    };
  }, [charIdx, deleting, wordIdx, words, typeSpeed, delSpeed, pause]);

  return display;
}
