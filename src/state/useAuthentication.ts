import { create } from 'zustand';
import { AppUser, TokenPayload } from '../model/User';
import { jwtDecode } from 'jwt-decode';

interface AuthStore {
  appUser: AppUser | undefined;
  isSessionActive: boolean;
  isAdmin: boolean;
  isSupervisor: boolean;
  setUserData: (token: string) => void;
  setLogoutTimer: (mils: number) => void;
  checkAutologin: () => void;
  logout: () => void;
}

const checkIfTokenIsValid = (appUser: AppUser): boolean => {
  return appUser.jwtExpiresAt - new Date().getTime() - 900000 > 0;
};

const convertTokenToUser = (token: string): AppUser => {
  const tokenPayload: TokenPayload = jwtDecode(token!);
  return {
    userId: tokenPayload.userId,
    userEmail: tokenPayload.sub,
    userRoles: tokenPayload.roles,
    jwtToken: token,
    jwtExpiresAt: tokenPayload.exp * 1000,
    isActive: tokenPayload.active,
    imageUrl: tokenPayload.imageUrl
  };
};

const useAuthentication = create<AuthStore>(set => {
  let logoutTimer: number;

  return {
    appUser: undefined,
    isSessionActive: false,
    isAdmin: false,
    isSupervisor: false,
    setLogoutTimer: mils => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      logoutTimer = setTimeout(() => {
        set(store => {
          localStorage.removeItem('clocklikeminds_portal');
          return { ...store, appUser: undefined, isSessionActive: false };
        });
      }, mils);
    },
    setUserData: token =>
      set(store => {
        const user = convertTokenToUser(token);
        localStorage.setItem('clocklikeminds_portal', token);
        const milliseconds = user.jwtExpiresAt - new Date().getTime();
        store.setLogoutTimer(milliseconds);
        const isAdmin = user && user.userRoles.indexOf('admin') > -1;
        const isSupervisor = user && user.userRoles.indexOf('supervisor') > -1;
        return { ...store, appUser: user, isSessionActive: true, isAdmin: isAdmin, isSupervisor: isSupervisor };
      }),
    checkAutologin: () =>
      set(store => {
        const token = localStorage.getItem('clocklikeminds_portal');
        const autologinUser = (token && convertTokenToUser(token)) || undefined;
        const isTokenValid = autologinUser && checkIfTokenIsValid(autologinUser);
        const isAdmin = autologinUser && autologinUser.userRoles.indexOf('admin') > -1;
        return {
          appUser: isTokenValid && autologinUser ? autologinUser : undefined,
          isSessionActive: isTokenValid && autologinUser ? true : false,
          isAdmin: isAdmin,
        };
      }),
    logout: () =>
      set(store => {
        clearTimeout(logoutTimer);
        localStorage.removeItem('clocklikeminds_portal');
        return { ...store, appUser: undefined, isSessionActive: false };
      }),
  };
});

export default useAuthentication;
