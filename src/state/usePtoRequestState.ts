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
    const dateStart = date ? new Date(date) : undefined;
    if(dateStart) {
      dateStart.setHours(0, 0, 0, 0)
    }
    console.log(dateStart)
    set(store => ({
      ...store,
      startDate: dateStart,
    }));
  },
  setEndDate: date => {
    const dateEnd = date ? new Date(date) : undefined;
    dateEnd && dateEnd.setHours(0, 0, 0, 0);
    set(store => ({
      ...store,
      endDate: dateEnd,
    }));
  },
}));

export default usePtoRequestState;
