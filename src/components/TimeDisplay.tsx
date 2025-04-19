
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
    <div 
      className={cn(
        "text-white text-xs font-mobile-body tracking-wider opacity-80", 
        "rounded-full px-2 py-0.5 bg-black/30",
        className
      )}
    >
      {time}
    </div>
  );
};

export default TimeDisplay;
