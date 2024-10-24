const useSupervisorDashboardCalculations = () => {
    const today = new Date();
    const currWeekMonday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDay() === 0 ? today.getDate() - 6 : today.getDate() - today.getDay() + 1
    );

    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currWeekMonday.getFullYear(), currWeekMonday.getMonth(), currWeekMonday.getDate() + i);
      currentWeek.push(day);
    }
    weeks.push(currentWeek);
  
    let nextWeek: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currWeekMonday.getFullYear(), currWeekMonday.getMonth(), currWeekMonday.getDate() + 7 + i);
      nextWeek.push(day);
    }
    weeks.push(nextWeek);

    return {today, currWeekMonday, weeks}
}

export default useSupervisorDashboardCalculations;