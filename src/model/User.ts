export interface AppUser {
  userId: number;
  userEmail: string;
  userRoles: string[];
  jwtToken: string;
  jwtExpiresAt: number;
}

export interface TokenPayload {
  exp: number;
  iat: number;
  roles: string[];
  sub: string;
  userId: number;
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
  ptoDaysFromLastYear: number;
  ptoDaysTotal: number;
  ptoDaysTaken: number;
}

export interface UserRegistrationFinish {
  appUserId: number;
  positionKey: string;
  hireStart: string;
  hireEnd: string | undefined;
  ptoDaysTotal: number;
}
