import { create } from 'zustand';
import { Setting } from '../model/Setting';

interface SettingsStore {
  parseFetchedSettings: (settings: Setting[]) => void;
  isMailingEnabled: boolean | undefined;
  updateMailingEnabled: (enabled: boolean) => void;
}

const useSettingsStore = create<SettingsStore>(set => ({
  parseFetchedSettings: (settings: Setting[]) => {
    const mailingSetting = settings.find(s => s.settingName === 'mailingEnabled');
    set(state => ({
      ...state,
      isMailingEnabled: mailingSetting ? mailingSetting.settingValue === 'true' ? true : mailingSetting.settingValue === 'false' ? false : undefined : undefined,
    }));
  },
  isMailingEnabled: undefined,
  updateMailingEnabled: isEnabled =>
    set(store => ({
      ...store,
      isMailingEnabled: isEnabled,
    })),
}));

export default useSettingsStore;
