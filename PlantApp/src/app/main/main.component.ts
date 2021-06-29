import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { DataService } from '../data.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  readonly VAPID_PUBLIC_KEY = "MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEzCFrALch4sArU0psCD5XPVbU9ExtE+LFYiVg9LnXLRH6lL4XQBCPNbRZWPN4+uoYzyxupU6HZM5nNbDFK5opyg==";

  plantForm = this.formBuilder.group({
    plantID: ''
  });

  constructor(
    private swPush: SwPush,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }
  

  subscribeNotifications() {
    this.swPush.requestSubscription(
      { serverPublicKey: this.VAPID_PUBLIC_KEY }
    )
      .then(
        sub=> console.log("pog", sub)
      )
      .catch(
        err => console.error("antipog", err)
      )
  }

  getPlant() {
    this.dataService.getPlantInformation(this.plantForm.value.plantID).subscribe(result => 
    {
      console.log(JSON.stringify(result))
    });
    
  }

}
