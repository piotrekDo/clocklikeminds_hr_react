import { create } from 'zustand';

interface PtoRequestState {
  isRequestingPto: boolean;
  startDate: Date | undefined;
  endDate: Date | undefined;
  setIsRequestingPto: (isRequesting: boolean) => void;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
}

const usePtoRequestState = create<PtoRequestState>(set => ({
  isRequestingPto: false,
  startDate: undefined,
  endDate: undefined,
  setIsRequestingPto: bol =>
    set(store => ({
      ...store,
      isRequestingPto: bol,
    })),
  setStartDate: date => {
    set(store => ({
      ...store,
      startDate: date,
    }));
  },
  setEndDate: date => {
    set(store => ({
      ...store,
      endDate: date,
    }));
  },
}));

export default usePtoRequestState;
