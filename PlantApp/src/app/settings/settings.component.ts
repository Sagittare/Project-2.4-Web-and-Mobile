import { Component} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { UserManipulatorService } from '../user-manipulator.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent  {
  //@Input() thema!: boolean; 
  //@Output() themaChange = new EventEmitter<boolean>();
  

  SettingsForm = this.formBuilder.group({
    thema: (localStorage.getItem('thema')),
    accountInstellingen: '',
    taal: (localStorage.getItem('taal'))
  });
  //console.log((localStorage.getItem('thema')))
  
  nameForm = this.formBuilder.group({
    username: 'username',
    password: 'password'
  });

  passwordForm = this.formBuilder.group({
    password: 'password',
    newPassword: 'password',
    newPasswordVerify: 'password'
  });

  deleteForm = this.formBuilder.group({
    username: 'username',
    password: 'password',
    confirm: 'confirm'
  });

  constructor(
    private formBuilder: FormBuilder,
    private userManipulator: UserManipulatorService
    ) {}
    

    onSubmit(): void {
      console.log((localStorage.getItem('thema')))
      //console.log(this.SettingsForm.value.thema + " " + this.SettingsForm.value.taal)
      //let instellingen = { thema: this.SettingsForm.value.thema, taal: this.SettingsForm.value.taal }
      let taal = this.SettingsForm.value.taal;
      let thema = this.SettingsForm.value.thema;
      //if (instellingen == null) {
      //  instellingen = { thema: false, taal: "NL"}
      //}
      localStorage.setItem('thema', thema);
      localStorage.setItem('taal', taal);
      
      //localStorage.setItem('settings', JSON.stringify(instellingen));
      console.log((localStorage.getItem('thema')))
    }
        
    onSubmitName(): void {
      const name = this.nameForm.value.username;
      const password = this.nameForm.value.password;
      this.userManipulator.editUsername(name, password);
    }

    onSubmitPassword(): void {
      const password = this.passwordForm.value.password;
      const newPassword = this.passwordForm.value.newPassword;
      const newPasswordVerify = this.passwordForm.value.newPasswordVerify;
      if (newPassword == newPasswordVerify) {
        this.userManipulator.editPassword(password, newPassword);
      }
      else {
        // show that passwords don't match!
      }
    }  

    onSubmitDelete(): void {
      const name = this.deleteForm.value.username;
      const password = this.deleteForm.value.password;
      const confirm = this.deleteForm.value.confirm;

      if (confirm == 1) {
        this.userManipulator.DeleteUser(name, password);
      }
      else {
        //show that operation was cancelled by user input!
      }
    }

  }
