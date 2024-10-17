import { create } from 'zustand';
import { darkBackgorund, darkElementBg, lightBackground } from '../library';
import { Theme, ThemeConfig } from '../model/Theme';

interface ThemeState {
  themeName: Theme;
  themeConfig: ThemeConfig;
  setTheme: (theme: Theme) => void;
}

const themeDark: ThemeConfig = {
  bg: darkBackgorund,
  elementBg: darkElementBg,
  fontColor: 'whiteAlpha.800',
  secondColor: 'rgba(255, 255 ,255, .8)',
};

const themeLight: ThemeConfig = {
  bg: lightBackground,
  elementBg: '#A8C7D8',
  fontColor: 'blackAlpha.800',
  secondColor: '#385898',
};

export const themeSettings = new Map<Theme, ThemeConfig>([
  ['dark', themeDark],
  ['light', themeLight],
]);

const saveTheme = (themeName: Theme) => {
  localStorage.setItem('clocklikeminds_portal_theme', themeName);
};

const useThemeState = create<ThemeState>(set => ({
  themeName: 'light',
  themeConfig: themeLight,
  setTheme: newTheme =>
    set(store => {
      saveTheme(newTheme);
      return {
        ...store,
        themeName: newTheme,
        themeConfig: themeSettings.get(newTheme),
      };
    }),
}));

export default useThemeState;
