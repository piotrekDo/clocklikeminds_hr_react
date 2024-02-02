export interface PtoRequestFormatted {
    id: number;
    isPending: boolean;
    wasAccepted: boolean;
    requestDateTime: Date;
    ptoStart: Date;
    ptoEnd: Date;
    applierId: number;
    applierFirstName: string;
    applierLastName: string;
    applierEmail: string;
    applierPtoDaysTotal: number;
    applierPtoDaysTaken: number;
    acceptorId: number;
    acceptorFirstName: string;
    acceptorLastName: string;
    acceptorEmail: string;
    decisionDateTime: Date;
    totalDays: number;
    businessDays: number;
    declineReason: string;
  }

  export interface PtoSummary {
    businessDays: number;
    holidayDays: { desc: string; isWeekend: boolean }[];
  }