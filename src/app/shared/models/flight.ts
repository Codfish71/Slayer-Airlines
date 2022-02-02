export class Flight {
  id: number = 0;
  flightTime!: Date;
  totalSeats: number = 60;
  availableSeats: number = 60;
  flightSeatInformation = [
    {
      seatNumber: 0,
      ticketId: 0,
      ancillaryService: '',
      isInfant: false,
      isDifferentlyAbled: false,
      isCheckedIn: false,
      passengerFirstName:'',
      passengerLastName:'',

    },
  ];
}
