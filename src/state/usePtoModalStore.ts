import { create } from 'zustand';
import { PtoRequestFormatted, PtoRequestResponse } from '../model/Pto';

interface PtoModalStore {
  ptoToCompareDates: PtoRequestFormatted | undefined;
  ptoExtendedModal: PtoRequestFormatted | undefined;
  ptoExtendedForUser: PtoRequestResponse | undefined;
  setPtoToCompareDates: (pto: PtoRequestFormatted | undefined) => void;
  setPtoExtendedModal: (pto: PtoRequestFormatted | undefined) => void;
  setPtoExtendedForUser: (pto: PtoRequestResponse | undefined) => void;
}

const usePtoModalStore = create<PtoModalStore>(set => ({
  ptoToCompareDates: undefined,
  ptoExtendedModal: undefined,
  ptoExtendedForUser: undefined,
  setPtoToCompareDates: pto =>
    set(store => ({
      ...store,
      ptoToCompareDates: pto,
    })),
  setPtoExtendedModal: pto =>
    set(store => ({
      ...store,
      ptoExtendedModal: pto,
    })),
  setPtoExtendedForUser: pto =>
    set(store => ({
      ...store,
      ptoExtendedForUser: pto,
    })),
}));

export default usePtoModalStore;
