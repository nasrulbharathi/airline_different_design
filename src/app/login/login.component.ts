import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../modals/user.modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  username: string;
  password: string;
  users: User[];

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit() {
    this.loginService.getUsersData().subscribe(
      message => {
        this.users = message;
      });
  }

  login() {
    let count = this.users.length;
    this.users.forEach(user => {
      if (user.username === this.username && user.password === this.password) {
        user.isAdmin ? this.router.navigate(['admin']) : this.router.navigate(['staff']);
        return;
      }
      count--;
    });
    if (count === 0) {
      alert('Invalid User');
    }
  }

  register() {
    this.router.navigate(['register']);
  }
}
