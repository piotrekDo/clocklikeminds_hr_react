import { create } from 'zustand';
import { Setting } from '../model/Setting';

interface SettingsStore {
  parseFetchedSettings: (settings: Setting[]) => void;
  isMailingEnabled: boolean | undefined;
  isMailingHrEnabled: boolean | undefined;
  updateMailingEnabled: (enabled: boolean) => void;
  updateMailingHrEnabled: (enabled: boolean) => void;
}

const useSettingsStore = create<SettingsStore>(set => ({
  parseFetchedSettings: (settings: Setting[]) => {
    const mailingSetting = settings.find(s => s.settingName === 'mailingLocalEnabled');
    const mailingHrSetting = settings.find(s => s.settingName === 'mailingHrEnabled');
    set(state => ({
      ...state,
      isMailingEnabled: mailingSetting ? mailingSetting.settingValue === 'true' ? true : mailingSetting.settingValue === 'false' ? false : undefined : undefined,
      isMailingHrEnabled: mailingHrSetting ? mailingHrSetting.settingValue === 'true' ? true : mailingHrSetting.settingValue === 'false' ? false : undefined : undefined,
    }));
  },
  isMailingEnabled: undefined,
  isMailingHrEnabled: undefined,
  updateMailingEnabled: isEnabled =>
    set(store => ({
      ...store,
      isMailingEnabled: isEnabled,
    })),
    updateMailingHrEnabled: isEnabled =>
      set(store => ({
        ...store,
        isMailingHrEnabled: isEnabled,
      })),
}));

export default useSettingsStore;
