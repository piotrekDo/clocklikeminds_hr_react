export interface AppUser {
  userId: number;
  userEmail: string;
  userRoles: string[];
  jwtToken: string;
  jwtExpiresAt: number;
  isActive: boolean;
  imageUrl: string;
  freelancer: boolean;
}

export interface TokenPayload {
  exp: number;
  iat: number;
  roles: string[];
  sub: string;
  userId: number;
  active: boolean;
  imageUrl: string;
  freelancer: boolean;
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
  startDate: string | undefined;
}

export interface EmployeeBasic {
  appUserId: number;
  freelancer: boolean;
  firstName: string;
  lastName: string;
  userEmail: string;
  imageUrl: string;
  registrationFinished: boolean;
  active: boolean;
  stillHired: boolean;
  position: EmployeePosition;
  seniorityInMonths: number;
  status: number;
}

export interface Employee {
  appUserId: number;
  freelancer: boolean;
  firstName: string;
  lastName: string;
  userEmail: string;
  imageUrl: string;
  userRoles: EmployeeRole[];
  registrationFinished: boolean;
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
  supervisorId: number;
  supervisorFirstName: string;
  supervisorLastName: string;
  subordinates: EmployeeBasic[];
}

export interface FinishRegistrationRequest {
  appUserId: number;
  isFreelancer: boolean;
  positionKey: string;
  hireStart: string;
  hireEnd: string | undefined;
  ptoDaysTotal: number;
  stillHired: boolean;
  supervisorId: number;
}

export interface UpdateHireDataRequest {
  appUserId: number;
  isFreelancer: boolean;
  positionKey: string | undefined;
  positionChangeDate: string | undefined;
  workStartDate: string | undefined;
  workEndDate: string | undefined;
  supervisorId: number | undefined;
}

export interface UpdateHolidayDataRequest {
  appUserId: number;
  ptoTotalDaysNewValue: number | undefined;
  ptoDaysAcquiredLastYearNewValue: number | undefined;
}

export interface UpdatePositionHistoryRequest {
  positionHistoryId: number;
  startDate: string | undefined;
}

export interface UpdateUserPermissionRequest {
  appUserId: number;
  hasAdminPermission: boolean;
  hasSupervisorRole: boolean;
  isActive: boolean;
}
