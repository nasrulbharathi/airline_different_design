import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Flight } from '../modals/flight.modal';
import { Ancillary } from '../modals/ancillary.modal';
import { Shopping } from '../modals/shopping.modal';
import { Meal } from '../modals/meal.modal';
import { Passenger } from '../modals/passenger.modal';

@Injectable({ providedIn: 'root' })
export class FlightService {

  seatConfig: any = null;
  public seatmap = [];
  seatChartConfig = {
    showRowsLabel: true,
    showRowWisePricing: true,
    newSeatNoForRow: true
  };

  constructor() {
    this.seatConfig = [
      {
        seat_price: 500,
        seat_map: [
          {
            seat_label: 'A',
            layout: 'g_g__g_g'
          },
          {
            seat_label: 'B',
            layout: 'g_g__g_g'
          },
          {
            seat_label: 'C',
            layout: 'g_g__g_g'
          },
          {
            seat_label: 'D',
            layout: 'g_g__g_g'
          }
        ]
      },
      {
        seat_price: 200,
        seat_map: [
          {
            seat_label: 'E',
            layout: 'ggg__ggg'
          },
          {
            seat_label: 'F',
            layout: 'ggg__ggg'
          },
          {
            seat_label: 'G',
            layout: 'ggg__ggg'
          },
          {
            seat_label: 'H',
            layout: 'ggg__ggg'
          },
          {
            seat_label: 'I',
            layout: 'ggg__ggg'
          },
          {
            seat_label: 'J',
            layout: 'ggg__ggg'
          },
          {
            seat_label: 'K',
            layout: 'ggg__ggg'
          },
          {
            seat_label: 'L',
            layout: 'ggg__ggg'
          }
        ]
      }
    ];
    this.processSeatChart(this.seatConfig);
    this.flight.forEach((flight) => {
      flight.ancillaryService = this.cloneObject(this.ancillaryItems);
      flight.shoppingItems = this.cloneObject(this.shoppingItems);
      flight.specialMeals = this.cloneObject(this.mealItems);
      flight.passengers = this.cloneObject(this.passenger);
      flight.seatMap = this.cloneObject(this.seatmap);
    });
  }

  ancillaryItems: Ancillary[] = [
    { name: '5Kg Baggage', cost: 3000, availed: false },
    { name: '10Kg Baggage', cost: 5000, availed: false },
    { name: '15Kg Baggage', cost: 7000, availed: false }
  ];

  shoppingItems: Shopping[] = [
    { name: 'Neck Pillow', cost: 1500 },
    { name: 'Bluetooth Speaker', cost: 5000 },
    { name: 'Utility Pouch', cost: 500 },
    { name: 'Bluetooth Earpods', cost: 6000 },
    { name: 'Whiskey Case', cost: 7000 }
  ];

  mealItems: Meal[] = [
    { name: 'Veg Meal', cost: 250 },
    { name: 'Fruit Platter', cost: 150 },
    { name: 'Seafood Meal', cost: 350 },
  ];

  passenger: Passenger[] = [
    {
      name: 'Rounaq',
      dateOfBirth: '25/07/1989',
      passportNumber: 'R105070',
      seatNo: '',
      address: 'Bangalore',
      wheelChair: false,
      isCheckedIn: false,
      isHavingInfant: false,
      ancillaryServices: this.cloneObject(this.ancillaryItems),
      shoppingItems: this.cloneObject(this.shoppingItems),
      specialMeals: this.cloneObject(this.mealItems)
    },
    {
      name: 'Nasrul',
      dateOfBirth: '05/06/1992',
      passportNumber: 'N124081',
      seatNo: '',
      address: 'Bangalore',
      wheelChair: false,
      isCheckedIn: false,
      isHavingInfant: false,
      ancillaryServices: this.cloneObject(this.ancillaryItems),
      shoppingItems: this.cloneObject(this.shoppingItems),
      specialMeals: this.cloneObject(this.mealItems)
    },
    {
      name: 'Aman',
      dateOfBirth: '16/02/1997',
      passportNumber: 'A154489',
      seatNo: '',
      address: 'Bangalore',
      wheelChair: true,
      isCheckedIn: false,
      isHavingInfant: true,
      ancillaryServices: this.cloneObject(this.ancillaryItems),
      shoppingItems: this.cloneObject(this.shoppingItems),
      specialMeals: this.cloneObject(this.mealItems)
    },
    {
      name: 'Vinu',
      dateOfBirth: '16/02/1997',
      passportNumber: 'A154489',
      seatNo: '',
      address: 'Bangalore',
      wheelChair: false,
      isCheckedIn: false,
      isHavingInfant: true,
      ancillaryServices: this.cloneObject(this.ancillaryItems),
      shoppingItems: this.cloneObject(this.shoppingItems),
      specialMeals: this.cloneObject(this.mealItems)
    },
    {
      name: 'Kamlesh',
      dateOfBirth: '16/02/1997',
      passportNumber: 'A154489',
      seatNo: '',
      address: 'Bangalore',
      wheelChair: true,
      isCheckedIn: false,
      isHavingInfant: false,
      ancillaryServices: this.cloneObject(this.ancillaryItems),
      shoppingItems: this.cloneObject(this.shoppingItems),
      specialMeals: this.cloneObject(this.mealItems)
    }
  ];

  flight: Flight[] = [
    // tslint:disable-next-line: max-line-length
    { id: 1, name: 'Air Asia', ancillaryService: [], shoppingItems: [], specialMeals: [], passengers: [], seatMap: [] },
    // tslint:disable-next-line: max-line-length
    { id: 2, name: 'Indigo', ancillaryService: [], shoppingItems: [], specialMeals: [], passengers: [], seatMap: [] },
    // tslint:disable-next-line: max-line-length
    { id: 3, name: 'Jet Airways', ancillaryService: [], shoppingItems: [], specialMeals: [], passengers: [], seatMap: [] },
    // tslint:disable-next-line: max-line-length
    { id: 4, name: 'Go Air', ancillaryService: [], shoppingItems: [], specialMeals: [], passengers: [], seatMap: [] },
    // tslint:disable-next-line: max-line-length
    { id: 5, name: 'Vistara', ancillaryService: [], shoppingItems: [], specialMeals: [], passengers: [], seatMap: [] }
  ];

  public dataChange: BehaviorSubject<Flight[]> = new BehaviorSubject<Flight[]>(this.flight);

  getFlightData(): Observable<Flight[]> {
    return this.dataChange.asObservable();
  }

  updateFlightData(flightData: Flight[]): void {
    this.flight = flightData;
    this.dataChange.next(this.flight);
  }

  cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // tslint:disable-next-line: variable-name
  public processSeatChart(map_data: any[]) {

    if (map_data.length > 0) {
      let seatNoCounter = 1;
      // tslint:disable-next-line: prefer-for-of tslint:disable-next-line: variable-name
      for (let __counter = 0; __counter < map_data.length; __counter++) {
        // tslint:disable-next-line: variable-name
        let row_label = '';
        // tslint:disable-next-line: variable-name
        const item_map = map_data[__counter].seat_map;

        // Get the label name and price
        row_label = 'Row ' + item_map[0].seat_label + ' - ';

        if (item_map[item_map.length - 1].seat_label !== ' ') {
          row_label += item_map[item_map.length - 1].seat_label;
        } else {
          row_label += item_map[item_map.length - 2].seat_label;
        }
        row_label += ' : Rs. ' + map_data[__counter].seat_price;

        // tslint:disable-next-line: variable-name
        item_map.forEach(map_element => {
          const mapObj = {
            seatRowLabel: map_element.seat_label,
            seats: [],
            seatPricingInformation: row_label
          };
          row_label = '';
          const seatValArr = map_element.layout.split('');
          if (this.seatChartConfig.newSeatNoForRow) {
            seatNoCounter = 1; // Reset the seat label counter for new row
          }
          let totalItemCounter = 1;
          seatValArr.forEach(item => {
            const seatObj = {
              key: map_element.seat_label + '_' + totalItemCounter,
              // tslint:disable-next-line: no-string-literal
              price: map_data[__counter]['seat_price'],
              status: 'available',
              passengerName: ''
            };

            if (item !== '_') {
              // tslint:disable-next-line: no-string-literal
              seatObj['seatLabel'] = map_element.seat_label + ' ' + seatNoCounter;
              // tslint:disable-next-line: no-string-literal
              if (seatNoCounter < 10) { seatObj['seatNo'] = '0' + seatNoCounter; } else { seatObj['seatNo'] = '' + seatNoCounter; }

              seatNoCounter++;
            } else {
              // tslint:disable-next-line: no-string-literal
              seatObj['seatLabel'] = '';
            }
            totalItemCounter++;
            // tslint:disable-next-line: no-string-literal
            mapObj['seats'].push(seatObj);
          });
          this.seatmap.push(mapObj);

        });
      }
    }
  }
}
