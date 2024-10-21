import { NewPtoRequestSummary } from '../../model/Pto';

const calculateEasterDate = (year: number) => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
};

export const getHolidaysPoland = (year: number): Map<string, string> => {
  //   console.log('HOLIDAYS RECALCULATED');
  const easterSunday = calculateEasterDate(year);
  const easterMonday = new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + 1);
  const whitsun = new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + 49);
  const corpusChristi = new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + 60);

  return new Map<string, string>([
    ['0,1', 'Nowy Rok'],
    ['0,6', 'Trzech Króli'],
    [`${easterSunday.getMonth()},${easterSunday.getDate()}`, 'Niedziela Wielkanocna'],
    [`${easterMonday.getMonth()},${easterMonday.getDate()}`, 'Poniedziałek Wielkanocny'],
    ['4,1', 'Święto Pracy'],
    ['4,3', 'Święto Konstytucji 3maja'],
    [`${whitsun.getMonth()},${whitsun.getDate()}`, 'Zielone Świątki'],
    [`${corpusChristi.getMonth()},${corpusChristi.getDate()}`, 'Boże Ciało'],
    ['7,15', 'Wniebowzięcie NMP'],
    ['10,1', 'Wszystkich Świętych'],
    ['10,11', 'Święto Niepodległości'],
    ['11,25', 'Boże Narodzenie'],
    ['11,26', 'Boże Narodzenie'],
  ]);
};

export const calculateBusinessDays = (from: Date, to: Date): NewPtoRequestSummary => {
  let year = from.getFullYear();
  let holidays = getHolidaysPoland(year);
  let checkedDate = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let businessDays = 0;
  const holidayDays: { desc: string; isWeekend: boolean }[] = [];

  console.log(checkedDate)
  while (checkedDate <= to) {
    if (checkedDate.getFullYear() !== year) {
      holidays = getHolidaysPoland(checkedDate.getFullYear());
    }
    const holiday = holidays.get(checkedDate.getMonth() + ',' + checkedDate.getDate());
    const isWeekend = checkedDate.getDay() === 0 || checkedDate.getDay() === 6;
    if (!holiday && !isWeekend) {
      businessDays++;
    } else if (holiday) {
      holidayDays.push({ desc: holiday, isWeekend: isWeekend });
    }
    checkedDate.setDate(checkedDate.getDate() + 1);
  }

  return { businessDays, holidayDays };
};
