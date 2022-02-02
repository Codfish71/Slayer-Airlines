import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private readonly flightSubject = new BehaviorSubject<any>([]);
  constructor() {}
  getFlight() {
    return this.flightSubject.asObservable();
  }
  nextFlight(flight: any) {
    this.flightSubject.next(flight);
  }
}
