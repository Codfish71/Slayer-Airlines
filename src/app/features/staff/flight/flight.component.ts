import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api.service';
import { FlightService } from 'src/app/core/services/flight.service';
import { Flight } from 'src/app/shared/models/flight';
import { Seating } from 'src/app/shared/models/seating';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit, AfterViewInit {
  availableFlights: any;
  flight = new Flight();
  seatingInformation = new Seating();
  allSeatsInFlight: Seating[] = [];
  checkedInSeats: Seating[] = [];
  filter: string = '';

  constructor(
    private apiService: ApiService,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {}
  loadData() {
    this.flightService.getFlight().subscribe((data) => {
      this.flight = data;
    });

    this.allSeatsInFlight = this.flight.flightSeatInformation;
  }
  filterData(filter: string) {
    this.filter = filter;
  }
  checkInPassenger(flightId: number, seatNumber: number) {
    this.allSeatsInFlight.forEach((element) => {
      if (element.seatNumber == seatNumber) {
        element.isCheckedIn = true;
        this.checkedInSeats.push(element);
        this.apiService.editFlight(this.flight).subscribe((data) => {
          console.log(data);
        });
      }
    });
  }
  undoCheckIn(flightId: number, seatNumber: number) {
    this.allSeatsInFlight.forEach((element) => {
      if (element.seatNumber == seatNumber) {
        element.isCheckedIn = false;
        this.apiService.editFlight(this.flight).subscribe((data) => {
          console.log(data);
        });
      }
    });
  }
  viewCheckedInSeats() {
    this.flight.flightSeatInformation = this.checkedInSeats;
    console.log(this.flight.flightSeatInformation);
  }
}
