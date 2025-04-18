
import React, { useState, useEffect } from 'react';

const TimeDisplay = () => {
  const [time, setTime] = useState<string>(getCurrentTime());

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-white text-sm font-mobile-body">
      {time}
    </div>
  );
};

export default TimeDisplay;
