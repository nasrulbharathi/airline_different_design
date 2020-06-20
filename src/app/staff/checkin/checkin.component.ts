import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Flight } from 'src/app/modals/flight.modal';
import { Passenger } from 'src/app/modals/passenger.modal';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  flight: Flight;
  passenger: Passenger;

  isWithInfant: boolean;
  needsWeelchair: boolean;
  seatStatus: any = '';

  constructor(public dialogRef: MatDialogRef<CheckinComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.flight = this.data.flight;
    this.passenger = this.data.passenger;
    this.isWithInfant = this.passenger.isHavingInfant;
    this.needsWeelchair = this.passenger.wheelChair;
  }

  public selectSeat(seatObject: any) {
    console.log('Clicked Seat---->', seatObject);

    if (seatObject.status === 'available') {
      if (this.passenger.seatNo === '') {
        if (this.passenger.wheelChair) {
          seatObject.status = 'bookedwithwheel';
        } else if (this.passenger.isHavingInfant) {
          seatObject.status = 'bookedwithchild';
        } else {
          seatObject.status = 'booked';
        }
        seatObject.passengerName = this.passenger.name;
        this.passenger.seatNo = seatObject.seatLabel;
        this.passenger.isCheckedIn = true;
      } else {
        console.log('seat already allocated');
      }
    } else if (seatObject.status !== 'available' && seatObject.passengerName === this.passenger.name) {
      seatObject.status = 'available';
      seatObject.passengerName = '';
      this.passenger.seatNo = '';
      this.passenger.isCheckedIn = false;
    }

    // if (this.seatStatus === '') {

    //   if (this.needsWeelchair) {
    //     seatObject.status = 'bookedwithwheel';
    //   } else if (this.isWithInfant) {
    //     seatObject.status = 'bookedwithchild';
    //   } else {
    //     seatObject.status = 'booked';
    //   }
    //   this.seatStatus = seatObject;
    // } else {

    //   if (this.seatStatus.key === seatObject.key) {
    //     this.seatStatus.status = 'available';
    //     this.seatStatus = '';
    //   } else {
    //     this.seatStatus.status = 'available';
    //     if (this.needsWeelchair) {
    //       seatObject.status = 'bookedwithwheel';
    //     } else if (this.isWithInfant) {
    //       seatObject.status = 'bookedwithchild';
    //     } else {
    //       seatObject.status = 'booked';
    //     }
    //     this.seatStatus = seatObject;
    //   }
    // }

  }

}
