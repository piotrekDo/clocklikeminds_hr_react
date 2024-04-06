import { create } from 'zustand';

interface EmployeesState {
  selectedEmloyee: number | undefined;
  isFinishingRegistration: boolean;
  isUpdatingEmployee: boolean;
  setSelectedEmployee: (employee: number | undefined) => void;
  setIsFinisshingRegistration: () => void;
  setIsUpdatingEmployee: () => void;
  setUpdatingEmployee: (bol: boolean) => void;
}

const useEmployeeState = create<EmployeesState>(set => ({
  selectedEmloyee: undefined,
  isFinishingRegistration: false,
  isUpdatingEmployee: false,
  setSelectedEmployee: emp => set(store => ({ ...store, selectedEmloyee: emp })),
  setIsFinisshingRegistration: () =>
    set(store => ({
      ...store,
      isFinishingRegistration: !store.isFinishingRegistration,
    })),
  setIsUpdatingEmployee: () =>
    set(store => ({
      ...store,
      isUpdatingEmployee: !store.isUpdatingEmployee,
    })),
  setUpdatingEmployee: bol =>
    set(store => ({
      ...store,
      isUpdatingEmployee: bol,
    })),
}));

export default useEmployeeState;
