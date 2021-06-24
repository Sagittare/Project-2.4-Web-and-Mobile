import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http'
import { subscribeOn } from 'rxjs/operators';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  TestForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  GetTestForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router

    ) {}

  onSubmit(): void {
    const login = this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
    login.subscribe();
    if(login) {
      this.router.navigate(['/settings'])
    }
    
  }
  
}