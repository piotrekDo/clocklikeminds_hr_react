export interface AppUser {
  userId: number;
  userEmail: string;
  userRoles: string[];
  jwtToken: string;
  jwtExpiresAt: number;
  isActive: boolean;
}

export interface TokenPayload {
  exp: number;
  iat: number;
  roles: string[];
  sub: string;
  userId: number;
  active: boolean;
}

export interface EmployeeRole {
  userRoleId: number;
  roleName: string;
}

export interface EmployeePosition {
  positionId: number;
  positionKey: string;
  displayName: string;
}

export interface EmployePositionRequest {
  positionKey: string;
  displayName: string;
}

export interface EmployeePositionHistory {
  positionHistoryId: number;
  position: EmployeePosition;
  startDate: string;
}

export interface EmployeeBasic {
  appUserId: number;
  firstName: string;
  lastName: string;
  userEmail: string;
  active: boolean;
  stillHired: boolean;
  position: EmployeePosition;
  seniorityInMonths: number;
}

export interface Employee {
  appUserId: number;
  firstName: string;
  lastName: string;
  userEmail: string;
  userRoles: EmployeeRole[];
  active: boolean;
  stillHired: boolean;
  position: EmployeePosition;
  positionHistory: EmployeePositionHistory[];
  hireStart: string;
  hireEnd: string | null;
  seniorityInMonths: number;
  ptoDaysAccruedLastYear: number;
  ptoDaysAccruedCurrentYear: number;
  ptoDaysLeftFromLastYear: number;
  ptoDaysLeftTotal: number;
  ptoDaysTaken: number;
}

export interface FinishRegistrationRequest {
  appUserId: number;
  positionKey: string;
  hireStart: string;
  hireEnd: string | undefined;
  ptoDaysTotal: number;
  stillHired: boolean;
}

export interface UpdateHireDataRequest {
  appUserId: number;
  positionKey: string | undefined;
  positionChangeDate: string | undefined;
  workStartDate: string | undefined;
  workEndDate: string | undefined;
}

export interface UpdateHolidayDataRequest {
  appUserId: number;
  ptoTotalDaysNewValue: number | undefined;
  ptoDaysAcquiredLastYearNewValue: number | undefined;
}
