import { create } from 'zustand';
import { PtoRequestFormatted } from '../model/Pto';

interface PtoCompareStore {
  pto: PtoRequestFormatted | undefined;
  setPto: (pto: PtoRequestFormatted | undefined) => void;
}

const usePtoComparationStore = create<PtoCompareStore>(set => ({
  pto: undefined,
  setPto: pto =>
    set(store => ({
      ...store,
      pto: pto,
    })),
}));

export default usePtoComparationStore;
