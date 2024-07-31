import React, {useState, useEffect, useContext} from 'react'
import { PlayerContext } from '../context/playerContext';

const VerticalText = () => {

  const { currentSong } = useContext(PlayerContext);
    const [words,setWords] = useState(['WELCOME...',"TO...","DTUNES..."]);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setDisplayedText(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      } else {
        setDisplayedText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 100; // Adjust typing speed
    const typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  useEffect(()=>{
    if(!currentSong) return;
    console.log(currentSong);
    setWords([currentSong.title.toUpperCase()+'...',currentSong.artist.toUpperCase()+'...'])
  },[currentSong])

  return (
    <div className="vertical-text">
      {displayedText.split('').map((char, index) => (
        <span key={index} className="vertical-char">{char}</span>
      ))}
    </div>
  );
}

export default VerticalText
