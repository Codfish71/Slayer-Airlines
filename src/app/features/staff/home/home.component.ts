import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { Flight } from 'src/app/shared/models/flight';
import { Seating } from 'src/app/shared/models/seating';
import { EventEmitter } from '@angular/core';
import { FlightService } from 'src/app/core/services/flight.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  activeColumn!: string;
  user: any;
  pageSizeOptions: number[] = [3, 5, 7];
  pageSizeOptions2: number[] = [3, 5, 7];
  pageSize = 3;
  currentPage = 0;
  availableFlightLength = 0;
  previousFlightLength = 0;
  previousPageIndex = 1;
  availableFlights: any[] = [];
  previousFlights: any[] = [];
  subscription!: Subscription;

  flightColumns: string[] = [
    'flightId',
    'flightTime',
    'totalSeats',
    'availableSeats',
    'viewFlight',

  ];
  previousFlightColumns: string[] = [
    'flightId',
    'flightTime',
    'totalSeats',
    'availableSeats',
    'viewFlight',

  ];
  availableFlightsDataSource!: MatTableDataSource<Flight>;
  previousFlightsDataSource!: MatTableDataSource<Flight>;
  newFlight = new Flight();
  flight = new Flight();
  seatingInformation = new Seating();
  allSeatsInFlight: Seating[] = [];
  checkedInSeats: Seating[] = [];
  today = new Date();

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private apiService: ApiService,
    private flightService: FlightService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  @ViewChild('paginator1', { static: false }) paginator1!: MatPaginator;
  @ViewChild('paginator2', { static: false }) paginator2!: MatPaginator;
  @ViewChild('availableFlightTableSort') sort1!: MatSort;
  @ViewChild('previousFlightTableSort') sort2!: MatSort;

  ngAfterViewInit() {
    this.availableFlightsDataSource = new MatTableDataSource<Flight>(
      this.availableFlights
    );
    this.previousFlightsDataSource = new MatTableDataSource<Flight>(
      this.previousFlights

    );
    this.availableFlightsDataSource.paginator = this.paginator1;
    this.availableFlightsDataSource.sort = this.sort1;
    this.previousFlightsDataSource.paginator = this.paginator2;
    this.previousFlightsDataSource.sort = this.sort2;
  }
  loadData() {
    this.apiService
      .loadFlights()
      .pipe(
        map((fligts: any) => {
          fligts.map((a: any) => {
            a.flightTime = new Date(a.flightTime);
            if (a.flightTime >= this.today) {
              a.availableSeats = a.totalSeats - a.flightSeatInformation.length;
              this.availableFlights.push(a);
              this.availableFlightLength += 1;
            }
            else {
              a.availableSeats = a.totalSeats - a.flightSeatInformation.length;
              this.previousFlights.push(a);
              this.previousFlightLength += 1;
            }
          });
        })
      )
      .subscribe((data) => {

      });
  }
  
  loadSingleFlight(flightId: number) {
    this.availableFlights.forEach((element: any) => {
      if (element.id == flightId) {
        this.flight = element;
      }
    });

    this.flight.flightSeatInformation.forEach((element) => {
      this.allSeatsInFlight.push(element);
    });

    this.flightService.nextFlight(this.flight);
    this.router.navigate(['staff/home/flight', this.flight.id]);
  }
  clearFlightModal() {
    this.allSeatsInFlight.splice(0, this.allSeatsInFlight.length);
  }
  checkInPassenger(flightId: number, seatNumber: number) {
    this.availableFlights.forEach((element: any) => {
      if (element.id == flightId) {
        this.flight = element;
      }
    });
    this.flight.flightSeatInformation.forEach((element) => {
      if (element.seatNumber == seatNumber) {
        element.isCheckedIn = true;
        this.checkedInSeats.push(element);
        let index = this.flight.flightSeatInformation.indexOf(element);
      }
    });
    this.apiService.editFlight(this.flight).subscribe((data) => { });
  }
  undoCheckIn(flightId: number, seatNumber: number) {
    this.availableFlights.forEach((element: Flight) => {
      if (element.id == flightId) {
        this.flight = element;
      }
    });
    this.flight.flightSeatInformation.forEach((element) => {
      if (element.seatNumber == seatNumber) {
        element.isCheckedIn = false;
        let index = this.checkedInSeats.indexOf(element);
        this.checkedInSeats.splice(index, 1);
        this.flight.flightSeatInformation.push(element);
      }
    });
  }

  logOut(): void {
    localStorage.removeItem('sessionToken');
    this.socialAuthService.signOut();
    this.router.navigate(['/admin/login']);
  }
}
