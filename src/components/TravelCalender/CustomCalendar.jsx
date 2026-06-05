// CustomCalendar.js
import React, { useState } from 'react';
import './TravelCalender.css'; // Add your own CSS styling

const CustomCalendar = () => {
  const flightDates = [
    { depDate: '2024-01-14T00:00:00.000Z' },
    { depDate: '2024-01-14T00:00:00.000Z' },
    { depDate: '2024-01-17T00:00:00.000Z' },
    { depDate: '2024-02-14T00:00:00.000Z' },
  ];

  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const specialDate = new Date('2024-01-14T00:00:00.000Z'); // The special date

  const daysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-indexed
    return new Date(year, month, 0).getDate();
  };

  const renderDays = () => {
    const totalDays = daysInMonth();
    const daysArray = Array.from(
      { length: totalDays },
      (_, index) => index + 1
    );

    return daysArray.map((day, i, arr) => {
      const specialDateCount = isSpecialDate(day);

      return (
        <div
          key={day}
          className={`calendar-day ${day === selectedDate ? 'selected' : ''} ${
            specialDateCount > 0 ? 'special-date' : ''
          }`}
          onClick={() => handleDayClick(day)}
        >
          {day}
          {specialDateCount > 0 && (
            <span className="notification-icon">
              &#x1F514;{specialDateCount}
            </span>
          )}
        </div>
      );
    });
  };

  const isSpecialDate = (day) => {
    let count = 0;

    flightDates.forEach((flight) => {
      const depDate = new Date(flight.depDate);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      if (
        day === depDate.getDate() &&
        month === depDate.getMonth() &&
        year === depDate.getFullYear()
      ) {
        count++;
      }
    });

    return count > 0;
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    // Add your own logic for handling the selected date
    // For example, you might want to display events for the selected date
  };

  const handleMonthChange = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  return (
    <div className="custom-calendar">
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)}>&lt;</button>
        <span>
          {currentDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <button onClick={() => handleMonthChange(1)}>&gt;</button>
      </div>
      <div className="calendar-grid">{renderDays()}</div>
    </div>
  );
};

export default CustomCalendar;
