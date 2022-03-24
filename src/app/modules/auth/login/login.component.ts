import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: string = '';
  password: string = '';

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  signIn() {
    if (this.login === 'dragon' && this.password === 'dragon') {
      localStorage.setItem('@dragonApp:logged', JSON.stringify(true));
      this.router.navigateByUrl('/dragons');
    }
  }
}
