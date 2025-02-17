'use client';

import { useTheme } from 'next-themes';

const WIDGET_WIDTH = 350;

const CalendarWidget = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const currentDate = new Date();
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

  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb','Dom'];
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const renderCalendarDays = () => {
    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="w-1/7 h-10"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === currentDate.getDate();
      calendarDays.push(
        <button
          key={i}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition 
            ${isToday ? 'bg-blue-500 text-white font-semibold' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
          {i}
        </button>
      );
    }
    return calendarDays;
  };

  return (
    <div className={`w-[${WIDGET_WIDTH}px] border-l p-6 ${isDark ? 'bg-black border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div key={index} className="text-center font-medium text-sm">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default CalendarWidget;