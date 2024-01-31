import { PtoRequestFormatted } from '../model/Pto';

export const usersPtos: PtoRequestFormatted[] = [
  {
    id: 12,
    isPending: false,
    wasAccepted: true,
    requestDateTime: new Date(2024, 0, 19, 12, 37),
    ptoStart: new Date(2024, 0, 22),
    ptoEnd: new Date(2024, 0, 26),
    applierId: 13,
    applierFirstName: 'Piotr',
    applierLastName: 'Domagalski',
    applierEmail: 'piotr.domagalski@clocklikeminds.com',
    applierPtoDaysTotal: 26,
    applierPtoDaysTaken: 6,
    acceptorId: 1,
    acceptorFirstName: 'Paweł',
    acceptorLastName: 'Brzeski',
    acceptorEmail: 'pawel.brzeski@clocklikeminds.com',
    decisionDateTime: new Date(2024, 0, 19, 13, 15),
    totalDays: 5,
    businessDays: 5,
    declineReason: '',
  },
];
