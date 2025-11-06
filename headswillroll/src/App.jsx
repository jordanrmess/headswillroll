import React, { useState, useEffect } from 'react';

const App = () => {
  const [imageSrc, setImageSrc] = useState('heads/c.png');
  const [timeoutId, setTimeoutId] = useState(null);
  const [glassesMode, setGlassesMode] = useState(false); 


  useEffect(() => {
    const handleMouseMove = (event) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      const deltaX = event.clientX - viewportCenterX;
      const deltaY = event.clientY - viewportCenterY;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      const folder = glassesMode ? 'glasses_mode' : 'heads';


      if (angle >= -22.5 && angle < 22.5) {
        setImageSrc(`${folder}/cr.png`);
      } else if (angle >= 22.5 && angle < 67.5) {
        setImageSrc(`${folder}/dr.png`);
      } else if (angle >= 67.5 && angle < 112.5) {
        setImageSrc(`${folder}/dc.png`);
      } else if (angle >= 112.5 && angle < 157.5) {
        setImageSrc(`${folder}/dl.png`);
      } else if ((angle >= 157.5 && angle <= 180) || (angle >= -180 && angle < -157.5)) {
        setImageSrc(`${folder}/cl.png`);
      } else if (angle >= -157.5 && angle < -112.5) {
        setImageSrc(`${folder}/ul.png`);
      } else if (angle >= -112.5 && angle < -67.5) {
        setImageSrc(`${folder}/uc.png`);
      } else if (angle >= -67.5 && angle < -22.5) {
        setImageSrc(`${folder}/ur.png`);
      }

      const id = setTimeout(() => {
        setImageSrc(`${folder}/c.png`);
      }, 2000); // 2000ms delay
      setTimeoutId(id);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [glassesMode,timeoutId]);

  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src={imageSrc}
        alt="Direction"
        className="w-16 h-16 object-contain"
      />   
       <button onClick={() => setGlassesMode(!glassesMode)}
        className="absolute bottom-4 px-4 py-2 text-black focus:outline-none">
       glasses mode {glassesMode ? 'off' : 'on'}

      </button>
       </div>
  );
};

export default App;