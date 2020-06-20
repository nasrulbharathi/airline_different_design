import { Ancillary } from './ancillary.modal';
import { Shopping } from './shopping.modal';
import { Meal } from './meal.modal';

export interface Passenger {
  name: string;
  dateOfBirth: string;
  passportNumber: string;
  seatNo: string;
  address: string;
  wheelChair: boolean;
  isCheckedIn: boolean;
  isHavingInfant: boolean;
  ancillaryServices: Ancillary[];
  shoppingItems: Shopping[];
  specialMeals: Meal[];
}
