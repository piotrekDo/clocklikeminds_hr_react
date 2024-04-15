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
  positionFilter: undefined | string;
  firstNameFilter: undefined | string;
  lastNameFilter: undefined | string;
  setEmployeeTableSortType: (order: SortOrder) => void;
  setPositionFilter: (filter: undefined | string) => void;
  setFirstNameFilter: (filter: undefined | string) => void;
  setLastNameFilter: (filter: undefined | string) => void;
}

const useSortState = create<SortState>(set => ({
  employeeTableSortType: 'firstNameAsc',
  positionFilter: undefined,
  firstNameFilter: undefined,
  lastNameFilter: undefined,
  setEmployeeTableSortType: order =>
    set(store => ({
      ...store,
      employeeTableSortType: order,
    })),
  setPositionFilter: filter =>
    set(store => ({
      ...store,
      positionFilter: filter,
    })),
  setFirstNameFilter: filter =>
    set(store => ({
      ...store,
      firstNameFilter: filter,
    })),
  setLastNameFilter: filter =>
    set(store => ({
      ...store,
      lastNameFilter: filter,
    })),
}));

export default useSortState;
