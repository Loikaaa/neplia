
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TimeDisplayProps {
  className?: string;
}

const TimeDisplay = ({ className }: TimeDisplayProps) => {
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
    <div className={cn("text-white text-sm font-mobile-body", className)}>
      {time}
    </div>
  );
};

export default TimeDisplay;
