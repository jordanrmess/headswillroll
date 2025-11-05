import React, { useState, useEffect } from 'react';

const App = () => {
  const [imageSrc, setImageSrc] = useState('heads/c.png');

  useEffect(() => {
    const handleMouseMove = (event) => {
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;

      const deltaX = event.clientX - viewportCenterX;
      const deltaY = event.clientY - viewportCenterY;

      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      if (angle >= -22.5 && angle < 22.5) {
        setImageSrc('heads/cr.png');
      } else if (angle >= 22.5 && angle < 67.5) {
        setImageSrc('heads/dr.png');
      } else if (angle >= 67.5 && angle < 112.5) {
        setImageSrc('heads/dc.png');
      } else if (angle >= 112.5 && angle < 157.5) {
        setImageSrc('heads/dl.png');
      } else if ((angle >= 157.5 && angle <= 180) || (angle >= -180 && angle < -157.5)) {
        setImageSrc('heads/cl.png');
      } else if (angle >= -157.5 && angle < -112.5) {
        setImageSrc('heads/ul.png');
      } else if (angle >= -112.5 && angle < -67.5) {
        setImageSrc('heads/uc.png');
      } else if (angle >= -67.5 && angle < -22.5) {
        setImageSrc('heads/ur.png');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="flex ]justify-center items-center min-h-screen">
      <img src={imageSrc} className="w-24 h-24 object-contain m-auto"
 />
    </div>
  );
};

export default App;