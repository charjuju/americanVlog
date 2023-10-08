import React, { useEffect, useState, useRef, useCallback, useMemo} from 'react';
import tvJude from './TV Jude.png';
import tvJudeFond from './TV Jude cheveux derier.png';
import usbDown from './usb down.png';
import usbUp from './usb UP.png';
import mainAgripeuse from './mainAgripeuse.png';
import bouttonbot from './boutton/bot.png';
import bouttonlecture from './boutton/lecture.png';
import bouttonpause from './boutton/pause.png';
import bouttontop from './boutton/top.png';
import bouttonleft from './boutton/left.png';
import bouttonright from './boutton/right.png';
import tvNoise from './tvNoise.jpg';
import toP from './Theo.jpeg'
import './App.css';


import piste1 from './pisteAudio/Le bouc.mp3'
import piste2 from './pisteAudio/Papayou.mp3'
import pistenoise from './pisteAudio/noise.mp3'

function App() {
  const allPist = useMemo(() => [piste1, piste2], []);
  const styleUsb = { width: '8%', position: 'fixed', top: '40vw', left: '75%', zIndex: '1' };
  const mainAgripeuseStyle = { width: '20%', position: 'fixed', top: '37vw', left: '78%', zIndex: '1' };
  const [spinning, setSpinning] = useState(false);
  const [chapitrePoited, setChapitrePoited] = useState(0);
  const [scrolling, setScrolling] = useState(-1);
  const [reload, setReload] = useState(false);

  const containerRef = useRef(null);

  const [audioPlaying, setAudioPlaying] = useState(false);

  // Référence à l'élément audio
  const audioRef = useRef(null);

    // Fonction pour contrôler la lecture audio
    const playAudio = useCallback(
      (audioFile) => {
        // Si l'audio est en cours de lecture, mettez en pause
        if (audioPlaying) {
          audioRef.current.pause();
        }
        
        // Chargez et jouez la nouvelle piste audio
        audioRef.current.src = audioFile;
        audioRef.current.play();
        
        // Mettez à jour l'état de lecture audio
        setAudioPlaying(true);
      },
      [audioRef, audioPlaying] // Liste de dépendances mise à jour
    );
    
  
    const playYe = useCallback(() => {
      console.log(chapitrePoited);
      playAudio(allPist[chapitrePoited]);
    }, [chapitrePoited, playAudio, allPist]);

  useEffect(() => {
    if (reload === true) {
      setReload(false)
      playYe()
    }
  }, [reload, playYe]);

  const handleButtonClickUsb = () => {
    playAudio(pistenoise)
    setSpinning(true);

    // Remettez l'animation à false après quelques secondes pour qu'elle puisse être déclenchée à nouveau
    setTimeout(() => {
      setReload(true)
      setSpinning(false);
    }, 4000); // Vous pouvez ajuster la durée de l'animation ici
  };

  const nextChapitre = (valueIncre) => {
    if (valueIncre === '+' && chapitrePoited < chapitreList.length - 1) {
      setChapitrePoited(chapitrePoited + 1)
      handleButtonClickUsb()
    }
    if (valueIncre === '-' && chapitrePoited > 0) {
      setChapitrePoited(chapitrePoited - 1)
      handleButtonClickUsb()
    }
  };

  const chapitreList = [<div>
    <img alt='mon foue' style={{width: '100%'}} src={toP}></img>
  </div>, <p>caca</p>]

  useEffect(() => {
    if (scrolling !== 0) {
      const container = containerRef.current;
      const scrollInterval = setInterval(() => {
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
          container.scrollTop = 0;
        } else {
          container.scrollTop += 2 * scrolling; // Vous pouvez ajuster la vitesse de défilement ici
        }
      }, 20); // 50 ms de délai entre chaque défilement
      return () => {
        clearInterval(scrollInterval);
      };
    }
  }, [scrolling]);


  return (
    <div style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center' }}>
      <audio ref={audioRef} />
      <div ref={containerRef} className='inageConteneur' style={{ height: '11vw', width: '30vw', backgroundColor: 'red', top: '33vw', position: 'fixed', zIndex: '2', overflow: 'scroll' }}>
      { !spinning ? chapitreList[chapitrePoited] : <img alt='mon foue' src={tvNoise} style={{width: '100%', height: '100%'}}></img>}
      </div>
      <img alt='mon foue' style={{ width: '90%', position: 'fixed', zIndex: '0' }} src={tvJudeFond}></img>
      <div>
        <img alt='mon foue' className={`${spinning ? 'slide-right' : ''}`} style={mainAgripeuseStyle} src={mainAgripeuse}></img>
        <img alt='mon foue' className={`${spinning ? 'slide-right' : ''}`} style={styleUsb} src={usbDown}></img>
        { !spinning &&
          <img alt='mon foue' className={`${spinning ? 'slide-right' : ''}`} style={styleUsb} src={usbUp}></img>
        }
      </div>
      <img alt='mon foue' style={{ width: '90%', position: 'fixed', zIndex: '3' }} src={tvJude}></img>
      <img alt='mon foue' onClick={() => setScrolling(-1)} style={{zIndex: '1000', height: '3vw', top: '33vw', position: 'fixed', left: '30vw'}} src={bouttontop}></img>
      <img alt='mon foue' onClick={() => setScrolling(1)} style={{zIndex: '1000', height: '3vw', top: '39vw', position: 'fixed', left: '30vw'}} src={bouttonbot} ></img>
      <img alt='mon foue' onClick={() => setScrolling(0)} style={{zIndex: '1000', height: '3vw', top: '36vw', position: 'fixed', left: '30vw'}} src={bouttonpause}></img>
      <img alt='mon foue' onClick={() => nextChapitre('+')} style={{zIndex: '1000', height: '3vw', top: '40vw', position: 'fixed', left: '74vw'}} src={bouttonright}></img>
      <img alt='mon foue' onClick={() => nextChapitre('-')} style={{zIndex: '1000', height: '3vw', top: '40vw', position: 'fixed', left: '69vw'}} src={bouttonleft}></img>
      {chapitrePoited !== null && !spinning ?
        <img alt='mon foue' onClick={() => playAudio(allPist[chapitrePoited])} style={{zIndex: '1000', height: '3vw', top: '40vw', position: 'fixed', left: '71vw'}} src={bouttonlecture}></img>
        :
        <img alt='mon foue' style={{zIndex: '1000', height: '3vw', top: '40vw', position: 'fixed', left: '71vw'}} src={bouttonlecture}></img>
        
      }
    </div>
  );
}

export default App;
