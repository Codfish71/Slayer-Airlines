import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flight } from 'src/app/shared/models/flight';
import { Ticket } from 'src/app/shared/models/ticket';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = ' http://localhost:3000/'
  constructor(private httpService:HttpClient) { }

  loadFlights<Flight>(){
    return this.httpService.get(this.baseUrl + 'flights')
  }
  deleteFlight<Flight>(subURL:string){
    return this.httpService.delete(this.baseUrl = subURL)
  }
  createFlight(flight:Flight){
    return this.httpService.post(this.baseUrl + 'flights',flight);
  }
  editFlight(flight:Flight){
    return this.httpService.put<any>(this.baseUrl + 'flights/'+ flight.id,flight);
  }
  getTicketData(){
    return this.httpService.get(this.baseUrl + "tickets");
  }
  postTicketData(ticket:Ticket){
    return this.httpService.post(this.baseUrl + "tickets",ticket);
  }
  
}
