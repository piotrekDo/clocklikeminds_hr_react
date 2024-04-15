import { create } from 'zustand';

export type UpdatingEmployeeSection =
  | 'hireDetails'
  | 'holidayDetails'
  | 'posHistoryDetails'
  | 'permissionDetails'
  | undefined;

interface EmployeesState {
  selectedEmloyee: number | undefined;
  isFinishingRegistration: boolean;
  isUpdatingEmployee: UpdatingEmployeeSection;
  setSelectedEmployee: (employee: number | undefined) => void;
  setIsFinisshingRegistration: () => void;
  setIsUpdatingEmployee: (section: UpdatingEmployeeSection) => void;
}

const useEmployeeState = create<EmployeesState>(set => ({
  selectedEmloyee: undefined,
  isFinishingRegistration: false,
  isUpdatingEmployee: undefined,
  setSelectedEmployee: emp => set(store => ({ ...store, selectedEmloyee: emp })),
  setIsFinisshingRegistration: () =>
    set(store => ({
      ...store,
      isFinishingRegistration: !store.isFinishingRegistration,
    })),
  setIsUpdatingEmployee: section =>
    set(store => ({
      ...store,
      isUpdatingEmployee: section,
    })),
}));

export default useEmployeeState;
