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