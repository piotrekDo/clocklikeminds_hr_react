import { EmployeeBasic } from './User';

export type PtoType = 'pto' | 'pto_on_demand' | 'child_care' | 'on_saturday_pto' | 'occasional_leave';

export interface OccasionalLeaveType {
  id: number;
  occasionalType: string;
  descriptionPolish: string;
  days: number;
}

export interface PtoRequestResponse {
  id: number;
  leaveType: string;
  demand: boolean;
  notes: string;
  pending: boolean;
  wasAccepted: boolean;
  requestDateTime: string;
  ptoStart: string;
  ptoEnd: string;
  applierId: number;
  applierFirstName: string;
  applierLastName: string;
  applierEmail: string;
  applierPtoDaysTotal: number;
  applierPtoDaysTaken: number;
  applierImageUrl: string;
  acceptorId: number;
  acceptorFirstName: string;
  acceptorLastName: string;
  acceptorEmail: string;
  decisionDateTime: Date;
  totalDays: number;
  businessDays: number;
  includingLastYearPool: number;
  declineReason: string;
  occasional_leaveReason: string;
  occasional_leaveTypeId: string;
  occasional_leaveType: string;
  occasional_descriptionPolish: string;
  occasional_days: string;
  saturday_holiday_date: string;
}

export interface PtoRequestFormatted {
  id: number;
  leaveType: string;
  demand: boolean;
  notes: string;
  pending: boolean;
  wasAccepted: boolean;
  requestDateTime: Date;
  ptoStart: Date;
  ptoEnd: Date;
  applierId: number;
  applierFirstName: string;
  applierLastName: string;
  applierEmail: string;
  applierPtoDaysTotal: number;
  applierPtoDaysTaken: number;
  applierImageUrl: string;
  acceptorId: number;
  acceptorFirstName: string;
  acceptorLastName: string;
  acceptorEmail: string;
  decisionDateTime: Date;
  totalDays: number;
  businessDays: number;
  includingLastYearPool: number;
  declineReason: string;
  occasional_leaveReason: string;
  occasional_leaveTypeId: string;
  occasional_leaveType: string;
  occasional_descriptionPolish: string;
  occasional_days: string;
  saturday_holiday_date: string;
}

export interface NewPtoRequestSummary {
  businessDays: number;
  holidayDays: { desc: string; isWeekend: boolean }[];
}

export interface UserPtoSummary {
  ptoDaysAccruedLastYear: number;
  ptoDaysAccruedCurrentYear: number;
  ptoDaysLeftFromLastYear: number;
  ptoDaysLeftCurrentYear: number;
  ptoDaysTaken: number;
  saturdayHolidaysCurrentYear: HolidayOnSaturday[];
}

export interface NewPtoRequest {
  ptoStart: string;
  ptoEnd: string;
  applierId: number;
  acceptorId: number | undefined;
  ptoType: PtoType | undefined;
  occasionalType: string | undefined;
  saturdayHolidayDate: string | undefined;
}

export interface ResolvePtoRequest {
  ptoRequestId: number;
  isAccepted: boolean;
  declineReason: string | undefined;
}

export interface HolidayOnSaturday {
  id: number;
  date: string;
  note: string;
  usedDate: string;
}

export interface HolidayOnSaturdayByUser {
  holiday: HolidayOnSaturday;
  employee: EmployeeBasic;
  pto: PtoRequestResponse;
}

export interface HolidayOnSaturdayAdminSummary {
  nextHolidayOnSaturday: HolidayOnSaturday;
  nextHolidayOnSaturdayInDays: number;
  currentYearHolidaysOnSaturday: HolidayOnSaturdayByUser[];
}
