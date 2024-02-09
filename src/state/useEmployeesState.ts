import { create } from 'zustand';

interface EmployeesState {
  selectedEmloyee: number | undefined;
  isUpdating: boolean;
  setSelectedEmployee: (employee: number | undefined) => void;
  setIsUpdating: () => void;
}

const useEmployeeState = create<EmployeesState>(set => ({
  selectedEmloyee: undefined,
  isUpdating: false,
  setSelectedEmployee: emp => set(store => ({ ...store, selectedEmloyee: emp })),
  setIsUpdating: () =>
    set(store => ({
      ...store,
      selectedEmloyee: store.selectedEmloyee,
      isUpdating: !store.isUpdating,
    })),
}));

export default useEmployeeState;
