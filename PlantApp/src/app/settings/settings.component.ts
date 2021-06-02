import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
//import Fs from "fs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent  {

  SettingsForm = this.formBuilder.group({
    thema: '',
    accountInstellingen: '',
    taal: ''
  });

  
  constructor(
    private formBuilder: FormBuilder
    ) {}
  

    onSubmit(): void {
      console.log(this.SettingsForm.value.thema + " " + this.SettingsForm.value.taal)
      let instellingen = { thema: this.SettingsForm.value.thema, taal: this.SettingsForm.value.taal }
      console.log(instellingen)
      localStorage.setItem('settings', JSON.stringify(instellingen));
      var instellingenJSON = JSON.stringify(instellingen)
      //var fs = require('fs');
      //fs.writeFile("thing.json", instellingenJSON ) 

    }
        
      

  

  }
