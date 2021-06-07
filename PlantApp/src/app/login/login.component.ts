import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http'
import { subscribeOn } from 'rxjs/operators';

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
    private AuthService: AuthService
    ) {}

  onSubmit(): void {
    const login = this.AuthService.login(this.loginForm.value.username, this.loginForm.value.password);
    login.subscribe();
  }



  onSubmitTest(): void {
    const test = this.AuthService.loginTest("test", "test");
    test.subscribe();
  }

  onGetTest(): void {
    const test = this.AuthService.getTest;
    //test.subscribe();
  }

}
