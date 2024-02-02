export interface AuthenticationResponse {
    userId: number;
    userEmail: string;
    firstName: string;
    lastName: string;
    userRoles: string[];
    jwtToken: string;
    jwtExpiresAt: string;
    jwtExpiresAtTimestamp: number;
  }