import { create } from 'zustand';

interface EmployeesState {
  selectedEmloyee: number | undefined;
  setSelectedEmployee: (employee: number | undefined) => void;
}

const useEmployeeState = create<EmployeesState>(set => ({
  selectedEmloyee: undefined,
  setSelectedEmployee: emp => set(store => ({ ...store, selectedEmloyee: emp })),
}));

export default useEmployeeState;
