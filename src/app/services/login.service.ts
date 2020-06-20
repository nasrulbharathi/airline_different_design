import { User } from '../modals/user.modal';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor() { }

  private users: User[] = [
    {
      username: 'admin',
      password: 'admin',
      isAdmin: true
    },
    {
      username: 'user',
      password: 'user',
      isAdmin: false
    }
  ];

  public dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);

  getUsersData(): Observable<User[]> {
    return this.dataChange.asObservable();
  }

  setUsersData(usersData: User[]): void {
    this.users = usersData;
    this.dataChange.next(this.users);
  }

}
