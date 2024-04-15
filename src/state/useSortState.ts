import { create } from 'zustand';

export type SortOrder =
  | 'firstNameAsc'
  | 'firstNameDesc'
  | 'lastNameAsc'
  | 'lastNameDesc'
  | 'positionAsc'
  | 'positionDesc'
  | 'seniorityAsc'
  | 'seniorityDesc'
  | 'statusAsc'
  | 'statusDesc';

interface SortState {
  employeeTableSortType: SortOrder;
  setEmployeeTableSortType: (order: SortOrder) => void;
}

const useSortState = create<SortState>(set => ({
  employeeTableSortType: 'firstNameAsc',
  setEmployeeTableSortType: order =>
    set(store => ({
      ...store,
      employeeTableSortType: order,
    })),
}));

export default useSortState;
