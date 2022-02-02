import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { FlightService } from 'src/app/core/services/flight.service';
import { Flight } from 'src/app/shared/models/flight';
import { Passenger } from 'src/app/shared/models/passenger';
import { Seating } from 'src/app/shared/models/seating';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { MatGridList } from '@angular/material/grid-list';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  flight = new Flight();
  seatingInformation = new Seating();
  numberOfSeats:number=0;
  allSeatsInFlight: Seating[] = [];
  checkedInSeats: Seating[] = [];
  seat = new Seating();
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
    this.numberOfSeats - this.allSeatsInFlight.length;
  }

  addPassenger(addPassengerForm: NgForm) {
    const seat = addPassengerForm.value;
    this.allSeatsInFlight.push(seat);
    this.apiService.editFlight(this.flight).subscribe((data) => {
      console.log(data);
    });
    this.apiService.postTicketData(seat).subscribe();
  }
  editPassenger(editPassengerForm: NgForm) {

    console.log(editPassengerForm.value);
  }
  
}
