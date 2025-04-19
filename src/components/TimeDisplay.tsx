
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
        "inline-block px-2 py-1 rounded-full text-xs font-semibold",
        "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
        "text-white shadow-sm animate-pulse-slow",
        className
      )}
    >
      {time}
    </div>
  );
};

export default TimeDisplay;
