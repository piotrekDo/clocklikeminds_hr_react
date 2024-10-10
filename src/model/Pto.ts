import { EmployeeBasic } from './User';

export type PtoType = 'pto' | 'pto_on_demand' | 'child_care' | 'on_saturday_pto' | 'occasional_leave';

export const ptoTypeTranslatePl = new Map([
  ['pto', 'Urlop wypoczynkowy'],
  ['pto_on_demand', 'Urlop na żądanie'],
  ['on_saturday_pto', 'Odbiór dnia wolnego za święto w sobotę'],
  ['occasional_leave', 'Urlop okolicznościowy'],
  ['child_care', 'Opieka nad dzieckiem'],
]);

export interface WithdrawResponse {
  requestId: number;
  applierId: number;
  wasDeleted: boolean;
  setToDelete: boolean;
}

export interface OccasionalLeaveType {
  id: number;
  occasionalType: string;
  descriptionPolish: string;
  days: number;
}

export type RequestHistoryAction =
  | 'REGISTER'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'MARKED_WITHDRAW'
  | 'WITHDRAW'
  | 'WITHDRAW_DECLINED';

export interface RequestHistoryDto {
  historyId: number;
  action: RequestHistoryAction;
  notes: string;
  dateTime: string;
  appUserId: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  imageUrl: string;
  timeOffRequestId: number;
}

interface PtoRequestBase {
  id: number;
  leaveType: string;
  demand: boolean;
  applicationNotes: string;
  requestHistory: RequestHistoryDto[];
  pending: boolean;
  wasAccepted: boolean;
  applierId: number;
  applierFirstName: string;
  applierLastName: string;
  applierEmail: string;
  applierPtoDaysTotal: number;
  applierPtoDaysTaken: number;
  applierImageUrl: string;
  applierFreelancer: boolean;
  acceptorId: number;
  acceptorFirstName: string;
  acceptorLastName: string;
  acceptorEmail: string;
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
  wasMarkedToWithdraw: boolean;
  wasWithdrawn: boolean;
  
}

export interface PtoRequestResponse extends PtoRequestBase {
  requestDateTime: string;
  ptoStart: string;
  ptoEnd: string;
  decisionDateTime: string;
  withdrawnDateTime: string;
}

export interface PtoRequestFormatted extends PtoRequestBase {
  requestDateTime: Date;
  ptoStart: Date;
  ptoEnd: Date;
  decisionDateTime: Date | undefined;
  withdrawnDateTime: Date | undefined;
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
  applierNotes: string | undefined;
}

export interface ResolvePtoRequest {
  ptoRequestId: number;
  isAccepted: boolean;
  notes: string | undefined;
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
