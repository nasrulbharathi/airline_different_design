import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Passenger } from 'src/app/modals/passenger.modal';
import { Flight } from 'src/app/modals/flight.modal';
import { Ancillary } from 'src/app/modals/ancillary.modal';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  mode: string;
  passenger: Passenger;
  flight: Flight;

  availedService: any = [];

  constructor(public dialogRef: MatDialogRef<ServicesComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.mode = this.data.mode;
    this.passenger = this.data.passenger;
    this.flight = this.data.flight;
  }

  filterServices(service) {
    if (this.availedService.includes(service)) {
      this.availedService.splice(this.availedService.indexOf(service), 1);
    } else {
      this.availedService.push(service);
    }
  }

  save() {
    if (this.mode === 'Ancillary Services') {
      this.passenger.ancillaryServices = [];
      this.passenger.ancillaryServices = this.availedService;
    } else if (this.mode === 'Shopping Items') {
      this.passenger.shoppingItems = [];
      this.passenger.shoppingItems = this.availedService;
    } else {
      this.passenger.specialMeals = [];
      this.passenger.specialMeals = this.availedService;
    }
    this.dialogRef.close();
  }
}
