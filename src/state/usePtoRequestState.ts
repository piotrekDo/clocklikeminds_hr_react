import { create } from 'zustand';
import { PtoType } from '../model/Pto';

interface PtoRequestState {
  isRequestingPto: boolean;
  startDate: Date | undefined;
  endDate: Date | undefined;
  isEndDateError: string | undefined;
  selectedPtoType: PtoType;
  setIsRequestingPto: (isRequesting: boolean) => void;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  setIsEndDateError: (error: string | undefined) => void;
  setSelectedPtoType: (type: PtoType) => void;
}

const usePtoRequestState = create<PtoRequestState>(set => ({
  isRequestingPto: false,
  startDate: undefined,
  endDate: undefined,
  isEndDateError: undefined,
  selectedPtoType: 'pto',
  setIsRequestingPto: bol =>
    set(store => ({
      ...store,
      isRequestingPto: bol,
    })),
  setStartDate: date => {
    set(store => {
      return {
        ...store,
        startDate: date,
        isEndDateError:
          !date && !store.endDate
            ? undefined
            : date && !store.endDate
            ? 'Wybierz datę końcową'
            : !date && store.endDate
            ? 'Wybierz datę początkową'
            : date && store.endDate && date > store.endDate
            ? 'Niepoprawne daty'
            : undefined,
      };
    });
  },
  setEndDate: date => {
    set(store => ({
      ...store,
      endDate: date,
      isEndDateError:
        !date && !store.startDate
          ? undefined
          : !date && store.startDate
          ? 'Wybierz datę końcową'
          : date && !store.startDate
          ? 'Wybierz datę początkową'
          : date && store.startDate && date < store.startDate
          ? 'Niepoprawne daty'
          : undefined,
    }));
  },
  setIsEndDateError: err => {
    set(store => ({
      ...store,
      isEndDateError: err,
    }));
  },
  setSelectedPtoType: type => {
    set(store => ({
      ...store,
      selectedPtoType: type,
    }));
  },
}));

export default usePtoRequestState;
