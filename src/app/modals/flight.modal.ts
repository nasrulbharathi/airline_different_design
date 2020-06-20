import { Passenger } from './passenger.modal';
import { Meal } from './meal.modal';
import { Shopping } from './shopping.modal';
import { Ancillary } from './ancillary.modal';

export interface Flight {
  id?: number;
  name: string;
  ancillaryService: Ancillary[];
  shoppingItems: Shopping[];
  specialMeals: Meal[];
  passengers: Passenger[];
  seatMap: [];
}
