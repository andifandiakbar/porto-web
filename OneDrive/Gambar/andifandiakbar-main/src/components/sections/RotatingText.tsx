"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  typingSpeed?: number;
  erasingSpeed?: number;
  pauseDelay?: number;
}

export default function RotatingText({ 
  texts, 
  typingSpeed = 80, 
  erasingSpeed = 40, 
  pauseDelay = 1500 
}: RotatingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const currentFullText = texts[currentTextIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTyping) {
      if (displayedText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => setIsTyping(false), pauseDelay);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
        }, erasingSpeed);
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isTyping, currentFullText, texts, typingSpeed, erasingSpeed, pauseDelay]);

  return (
    /* leading-none membuat jarak atas dengan judul menjadi sangat rapat */
    <div className="relative flex items-center justify-center w-full leading-none mt-2 md:mt-4">
      
      {/* Spacer (Hidden): pb-2 agar container tidak memotong ekor huruf */}
      <span className="invisible block whitespace-nowrap font-bold text-3xl md:text-5xl px-10 pb-2">
        {texts.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>

      {/* Layer Teks */}
      <div className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
        <motion.span
          /* pb-2 cukup untuk menjaga huruf 'g' tanpa menjauhkan jarak ke bawah */
          className="font-bold text-3xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 inline-flex items-center pb-2"
        >
          {Array.from(displayedText).map((char, i) => (
            <motion.span key={i} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-[3px] h-[0.8em] bg-purple-500 ml-1 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          />
        </motion.span>
      </div>
    </div>
  );
}