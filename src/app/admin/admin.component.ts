import { Component, OnInit } from '@angular/core';
import { FlightService } from '../services/flight.service';
import { Flight } from '../modals/flight.modal';
import { Ancillary } from '../modals/ancillary.modal';
import { Shopping } from '../modals/shopping.modal';
import { Meal } from '../modals/meal.modal';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Passenger } from '../modals/passenger.modal';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public store: Store<fromApp.AppState>, private dialog: MatDialog, private flightService: FlightService) { }

  flights: Flight[];
  unfilteredPassengers: Passenger[];
  selectedFlight: Flight;

  ancillaryName: string;
  ancillaryCost: string;
  editMode = false;
  editAnci: Ancillary;

  shoppingName: string;
  shoppingCost: string;
  editShopMode = false;
  editShop: Shopping;

  mealName: string;
  mealCost: string;
  editMealMode = false;
  editSpecialMeal: Shopping;

  isAddingPassenger: boolean;

  noFilter = true;
  noPassport = false;
  noAddress = false;
  noDOB = false;

  ngOnInit() {
    this.flightService.getFlightData().subscribe(
      message => {
        this.flights = message;
      });
  }

  changeFlight(flightId) {
    this.selectedFlight = this.flights[flightId - 1];
    if (this.selectedFlight) {
      this.unfilteredPassengers = JSON.parse(JSON.stringify(this.selectedFlight.passengers));
    } else {
      this.unfilteredPassengers = [];
    }
    this.noFilter = true;
    this.noPassport = false;
    this.noAddress = false;
    this.noDOB = false;
  }

  addAncillary() {
    if (this.ancillaryName && this.ancillaryCost) {
      // tslint:disable-next-line: max-line-length
      this.flights[this.selectedFlight.id - 1].ancillaryService.push({ name: this.ancillaryName, cost: Number(this.ancillaryCost), availed: false });
      this.ancillaryName = '';
      this.ancillaryCost = '';
      this.flightService.updateFlightData(this.flights);
    }
  }

  deleteAncillary(ancillary: Ancillary) {
    // tslint:disable-next-line: max-line-length
    this.flights[this.selectedFlight.id - 1].ancillaryService = this.removeFromArray(this.flights[this.selectedFlight.id - 1].ancillaryService, 'name', ancillary.name);
    this.flightService.updateFlightData(this.flights);
  }

  editAncillary(ancillary: Ancillary) {
    this.deleteAncillary(ancillary);
    this.addAncillary();
    this.ancillaryName = '';
    this.ancillaryCost = '';
    this.editMode = false;
  }

  addShopping() {
    if (this.shoppingName && this.shoppingCost) {
      this.flights[this.selectedFlight.id - 1].shoppingItems.push({ name: this.shoppingName, cost: Number(this.shoppingCost) });
      this.shoppingName = '';
      this.shoppingCost = '';
      this.flightService.updateFlightData(this.flights);
    }
  }

  deleteShopping(shopping: Shopping) {
    // tslint:disable-next-line: max-line-length
    this.flights[this.selectedFlight.id - 1].shoppingItems = this.removeFromArray(this.flights[this.selectedFlight.id - 1].shoppingItems, 'name', shopping.name);
    this.flightService.updateFlightData(this.flights);
  }

  editShopping(shopping: Shopping) {
    this.deleteShopping(shopping);
    this.addShopping();
    this.shoppingName = '';
    this.shoppingCost = '';
    this.editShopMode = false;
  }

  addMeal() {
    if (this.mealName && this.mealCost) {
      this.flights[this.selectedFlight.id - 1].specialMeals.push({ name: this.mealName, cost: Number(this.mealCost) });
      this.mealName = '';
      this.mealCost = '';
      this.flightService.updateFlightData(this.flights);
    }
  }

  deleteMeal(meal: Meal) {
    // tslint:disable-next-line: max-line-length
    this.flights[this.selectedFlight.id - 1].specialMeals = this.removeFromArray(this.flights[this.selectedFlight.id - 1].specialMeals, 'name', meal.name);
    this.flightService.updateFlightData(this.flights);
  }

  editMeal(meal: Meal) {
    this.deleteMeal(meal);
    this.addMeal();
    this.mealName = '';
    this.mealCost = '';
    this.editMealMode = false;
  }

  removeFromArray(arr, attr, value) {
    let i = arr.length;
    while (i--) {
      if (arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  openDialog(mode: string, passenger?: Passenger): void {
    let dialogRef;
    if (mode === 'add') {
      this.isAddingPassenger = true;
      dialogRef = this.dialog.open(DialogComponent, {
        width: '50%',
        data: {
          name: '',
          dateOfBirth: '',
          passportNumber: '',
          seatNo: '',
          address: '',
          wheelChair: false,
          isCheckedIn: false,
          isHavingInfant: false,
          ancillaryServices: [],
          shoppingItems: [],
          specialMeals: []
        }
      });
    } else if (mode === 'view') {
      this.isAddingPassenger = false;
      dialogRef = this.dialog.open(DialogComponent, {
        width: '50%',
        data: passenger
      });
      this.filter('nofilter');
      this.noFilter = true;
    } else {
      this.isAddingPassenger = false;
      dialogRef = this.dialog.open(DialogComponent, {
        width: '50%',
        data: passenger
      });
      this.filter('nofilter');
      this.noFilter = true;
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.isAddingPassenger && result.name.trim() !== '') {
        this.flights[this.selectedFlight.id - 1].passengers.push(result);
        this.flightService.updateFlightData(this.flights);
        if (this.selectedFlight) {
          this.unfilteredPassengers = JSON.parse(JSON.stringify(this.selectedFlight.passengers));
        } else {
          this.unfilteredPassengers = [];
        }
      }
    });
  }

  deletePassenger(passenger: Passenger) {
    // tslint:disable-next-line: max-line-length
    this.flights[this.selectedFlight.id - 1].passengers = this.removeFromArray(this.flights[this.selectedFlight.id - 1].passengers, 'name', passenger.name);
    this.flightService.updateFlightData(this.flights);
  }

  filter(mode: string) {
    if (mode === 'passport') {
      if (!this.noPassport) {
        this.noFilter = false;
        this.noAddress = false;
        this.noDOB = false;
        this.selectedFlight.passengers = this.unfilteredPassengers.filter((passenger) => {
          return passenger.passportNumber.trim() === '' ? passenger : null;
        });
      } else {
        this.noFilter = true;
        this.noAddress = false;
        this.noDOB = false;
        this.selectedFlight.passengers = this.unfilteredPassengers;
      }
    } else if (mode === 'address') {
      if (!this.noAddress) {
        this.noFilter = false;
        this.noPassport = false;
        this.noDOB = false;
        this.selectedFlight.passengers = this.unfilteredPassengers.filter((passenger) => {
          return passenger.address.trim() === '' ? passenger : null;
        });
      } else {
        this.noFilter = true;
        this.noPassport = false;
        this.noDOB = false;
        this.selectedFlight.passengers = this.unfilteredPassengers;
      }
    } else if (mode === 'dob') {
      if (!this.noDOB) {
        this.noFilter = false;
        this.noPassport = false;
        this.noAddress = false;
        this.selectedFlight.passengers = this.unfilteredPassengers.filter((passenger) => {
          return passenger.dateOfBirth.trim() === '' ? passenger : null;
        });
      } else {
        this.noFilter = true;
        this.noPassport = false;
        this.noAddress = false;
        this.selectedFlight.passengers = this.unfilteredPassengers;
      }
    } else {
      if (!this.noFilter) {
        this.noPassport = false;
        this.noAddress = false;
        this.noDOB = false;
      }
      this.selectedFlight.passengers = this.unfilteredPassengers;
    }

  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
