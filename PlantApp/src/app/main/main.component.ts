import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
//import * as fs from 'file-system';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  readonly VAPID_PUBLIC_KEY = "MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEzCFrALch4sArU0psCD5XPVbU9ExtE+LFYiVg9LnXLRH6lL4XQBCPNbRZWPN4+uoYzyxupU6HZM5nNbDFK5opyg==";

  constructor(
    private swPush: SwPush
  ) { }
  

  subscribeNotifications(){
    
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub=> console.log("pog", sub)
      )
      .catch(err => console.error("antipog", err))
  }


}
