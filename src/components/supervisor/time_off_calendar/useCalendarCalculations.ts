import { useState } from 'react';

const useCalendarCalculations = (selectedDate: Date) => {
  const firstDayOfSelectedMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const lastDayOfSelectedMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  const lastDayOfPreviousMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate();
  const firstRowLength = (firstDayOfSelectedMonth.getDay() === 0 ? 6 : firstDayOfSelectedMonth.getDay() - 1);
  const lastRowLength = (lastDayOfSelectedMonth.getDay() === 0 ? 0 : 7 - lastDayOfSelectedMonth.getDay());

  return { firstRowLength, lastDayOfPreviousMonth, lastDayOfSelectedMonth, lastRowLength };
};

export default useCalendarCalculations;
