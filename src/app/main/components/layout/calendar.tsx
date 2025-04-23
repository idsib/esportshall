'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/context/theme-context';

export default function Calendar() {
  const [currentDate] = useState(new Date());
  const { theme } = useTheme();
  
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  
  const hasEvent = (day: number) => {
    // Example events - replace with real event data
    return [9, 13, 17, 30].includes(day);
  };

  return (
    <div className={`border rounded-xl p-6 ${
      theme === 'dark'
        ? 'bg-dark-200/95 border-dark-300'
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          CALENDARIO
        </h2>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm text-neutral-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array(firstDayOfMonth).fill(null).map((_, index) => (
          <div key={`empty-${index}`} className="h-8" />
        ))}
        
        {days.map((day) => (
          <div
            key={day}
            className={`h-8 flex items-center justify-center rounded-full text-sm cursor-pointer transition-colors
              ${hasEvent(day) 
                ? 'bg-yellow-400 text-black hover:bg-yellow-500' 
                : theme === 'dark'
                  ? 'hover:bg-neutral-800'
                  : 'hover:bg-gray-50/80'
              } ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
