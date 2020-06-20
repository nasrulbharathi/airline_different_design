import { Component, OnInit } from '@angular/core';
import { FlightService } from '../services/flight.service';
import { Flight } from '../modals/flight.modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CheckinComponent } from './checkin/checkin.component';
import { Passenger } from '../modals/passenger.modal';
import { ServicesComponent } from './services/services.component';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(
    private store: Store<fromApp.AppState>,
    private flightService: FlightService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog) {
  }

  // Stepper
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  flights: Flight[];
  selectedFlight: Flight;

  // Seat Map
  seatChartConfig;

  ngOnInit() {
    this.flightService.getFlightData().subscribe(
      message => {
        this.flights = message;
      });

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  changeFlight(flightId) {
    this.selectedFlight = this.flights[flightId - 1];
    this.seatChartConfig = this.flightService.seatChartConfig;
  }

  openDialog(passenger: Passenger): void {
    const dialogRef = this.dialog.open(CheckinComponent, { width: '30%', data: { flight: this.selectedFlight, passenger } });

    dialogRef.afterClosed().subscribe(result => {
      this.flightService.updateFlightData(this.flights);
    });

  }

  openServicesDialog(mode: string, passenger: Passenger, flight: Flight): void {
    const dialogRef = this.dialog.open(ServicesComponent, { width: '30%', data: { mode, passenger, flight } });

    dialogRef.afterClosed().subscribe(result => {
      this.flightService.updateFlightData(this.flights);
    });
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
