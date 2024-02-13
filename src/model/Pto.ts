export interface PtoRequestResponse {
    id: number;
    isPending: boolean;
    wasAccepted: boolean;
    requestDateTime: string;
    ptoStart: string;
    ptoEnd: string;
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
    includingLastYearPool: number;
    declineReason: string;
  }

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
    includingLastYearPool: number;
    declineReason: string;
  }

  export interface NewPtoRequestSummary {
    businessDays: number;
    holidayDays: { desc: string; isWeekend: boolean }[];
  }

  export interface UserPtoSummary {
    ptoDaysAccruedLastYear: number,
    ptoDaysAccruedCurrentYear: number,
    ptoDaysLeftFromLastYear: number,
    ptoDaysLeftCurrentYear: number,
    ptoDaysTaken: number,
    lastRequests: PtoRequestResponse[]
  }
