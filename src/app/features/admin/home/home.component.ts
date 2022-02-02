import { DataSource } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { Flight } from 'src/app/shared/models/flight';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Seating } from 'src/app/shared/models/seating';
import { FlightService } from 'src/app/core/services/flight.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  activeColumn!: string;
  user: any;
  pageSizeOptions: number[] = [3, 5, 7];
  pageSizeOptions2: number[] = [3, 5, 7];
  pageSize = 3;
  currentPage = 1;
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
    'deleteFlight',
  ];
  previousFlightColumns: string[] = [
    'flightId',
    'flightTime',
    'totalSeats',
    'availableSeats',
    'viewFlight',
    'deleteFlight',
  ];
  availableFlightsDataSource!: MatTableDataSource<Flight>;
  previousFlightsDataSource!: MatTableDataSource<Flight>;
  newFlight = new Flight();
  flight = new Flight();
  seatingInformation = new Seating();
  allSeatsInFlight: Seating[] = [];
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
      });
    this.availableFlightsDataSource = new MatTableDataSource<Flight>(
      this.availableFlights
    );
    this.previousFlightsDataSource = new MatTableDataSource<Flight>(
      this.previousFlights
    );
  }
  loadSingleFlight(flightId: number) {
    this.availableFlights.forEach((element: any) => {
      if (element.id == flightId) {
        this.flight = element;
      }
    });

    if (this.flight.flightSeatInformation.length != 0) {
      this.flight.flightSeatInformation.forEach((element) => {
        this.allSeatsInFlight.push(element);
      });
    }

    this.flightService.nextFlight(this.flight);
    this.router.navigate(['admin/home/flight', this.flight.id]);
  }

  clearFlightModal() {
    this.allSeatsInFlight.splice(0, this.allSeatsInFlight.length);
  }
  deletFlight(flightId: number) {
    let subURL = 'flights?flightId=' + flightId;
    this.apiService.deleteFlight(subURL);
  }
  addNewFlight(flight: NgForm) {
    flight.value.flightSeatInformation = []
    this.apiService.createFlight(flight.value).subscribe();
  }

  pageChange(event: Event) {

  }
  logOut(): void {
    localStorage.removeItem('sessionToken');
    this.socialAuthService.signOut();
    this.router.navigate(['/admin/login']);
  }
  ngOnDestroy(): void {
    this.availableFlightsDataSource.disconnect();
  }
}
