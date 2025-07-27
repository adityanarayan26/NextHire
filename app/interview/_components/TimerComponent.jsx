import React, { useEffect, useState } from 'react';

const TimerComponent = ({ durationInMinutes }) => {
  const [timeLeft, setTimeLeft] = useState(durationInMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [durationInMinutes]);

  const formatTime = (totalSeconds) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div>
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};

export default TimerComponent;
