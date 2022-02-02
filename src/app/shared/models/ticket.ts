export class Ticket {
  ticketId: number = 0;
  passportId: number = 0;
  flightId: number = 0;
  seatNumber: number = 0;
  isCheckedIn: boolean = false;
  isInfant: boolean = false;
  isPhysicallyDisabled: boolean = false;
  meals: Array<string> = [];
  anicillaryServices: Array<string> = [];
  shoppingItems: Array<string> = [];
}
