import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../modals/user.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public users: User[];

  constructor(private router: Router, private loginService: LoginService) {
  }

  username = '';
  password = '';
  confirmPass = '';
  isAdmin = false;

  ngOnInit() {
    this.loginService.getUsersData().subscribe(
      message => {
        this.users = message;
      });
  }

  submit() {
    if (this.username.trim() !== '' && this.password.trim() !== '' && this.confirmPass.trim() !== '') {
      if (this.password.trim() === this.confirmPass.trim()) {
        this.users.push({ username: this.username, password: this.password, isAdmin: this.isAdmin });
        this.loginService.setUsersData(this.users);
        this.router.navigate(['login']);
      } else {
        alert('Password do not match.');
      }
    } else {
      alert('Please enter valid details');
    }
  }

  login() {
    this.router.navigate(['login']);
  }
}
