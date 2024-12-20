import { PtoRequestFormatted, PtoRequestResponse } from "./model/Pto";
import { Employee } from "./model/User";

export const trimText = (text: string, length: number): string => {
  if (length < 3) return '...';
    return text.substring(0, length - 3) + '...'
};

export const mapPtoRequestResponseToFormatted = (pto: PtoRequestResponse) : PtoRequestFormatted => {
  const ptoStartLocal =  new Date(pto.ptoStart);
  const ptoEndLocal = new Date(pto.ptoEnd);
  const withdrawnLocal = pto.withdrawnDateTime ? new Date(pto.withdrawnDateTime) : undefined;
  const ptoStart = new Date(Date.UTC(ptoStartLocal.getFullYear(), ptoStartLocal.getMonth(), ptoStartLocal.getDate()));
  const ptoEnd = new Date(Date.UTC(ptoEndLocal.getFullYear(), ptoEndLocal.getMonth(), ptoEndLocal.getDate()));

  return {
    ...pto,
    requestDateTime: new Date(pto.requestDateTime),
    ptoStart: ptoStart,
    ptoEnd: ptoEnd,
    decisionDateTime: pto.decisionDateTime ? new Date(pto.decisionDateTime) : undefined,
    withdrawnDateTime: withdrawnLocal
  };
}

export const determineSeniority = (employee: Employee) => {
  const years = Math.floor(employee.seniorityInMonths / 12);
  const months = (employee.seniorityInMonths - years * 12) % 12;

  if (years > 0) {
    return `${years} lat, ${months} miesięcy`;
  } else {
    return `${months} miesięcy`;
  }
};
