import { useState, useEffect } from 'react';

export function LoadingText({ baseText = "hello" }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center whitespace-nowrap">
      <span>{baseText}</span>
      <span className="inline-block text-left" style={{ minWidth: '3ch' }}>
        {dots}
      </span>
    </span>
  );
}