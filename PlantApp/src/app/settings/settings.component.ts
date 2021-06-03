import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent  {
  

  SettingsForm = this.formBuilder.group({
    thema: (localStorage.getItem('thema')),
    accountInstellingen: '',
    taal: (localStorage.getItem('taal'))
  });
  //console.log((localStorage.getItem('thema')))
  
  constructor(
    private formBuilder: FormBuilder
    ) {}
    

    onSubmit(): void {
      console.log((localStorage.getItem('thema')))
      //console.log(this.SettingsForm.value.thema + " " + this.SettingsForm.value.taal)
      //let instellingen = { thema: this.SettingsForm.value.thema, taal: this.SettingsForm.value.taal }
      let taal = this.SettingsForm.value.taal
      let thema = this.SettingsForm.value.thema 
      //if (instellingen == null) {
      //  instellingen = { thema: false, taal: "NL"}
      //}
      localStorage.setItem('thema', thema);
      localStorage.setItem('taal', taal);
      
      //localStorage.setItem('settings', JSON.stringify(instellingen));
      console.log((localStorage.getItem('thema')))
    }
        
      

  

  }
