import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Passenger } from 'src/app/modals/passenger.modal';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  passenger: Passenger;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Passenger) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.passenger = this.data;
  }

}
