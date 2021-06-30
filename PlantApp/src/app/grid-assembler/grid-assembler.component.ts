import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-grid-assembler',
  templateUrl: './grid-assembler.component.html',
  styleUrls: ['./grid-assembler.component.css']
})
export class GridAssemblerComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //this.generateTiles();
  }

  public getData() {
    const getPlants = this.dataService.getUserPlants(this.authService.getToken());
    getPlants.subscribe(res => {
      console.log(JSON.stringify(res))
    })
  }

  generateTiles() {
    let tiles = document.getElementById("tiles");
    let output = "";
    let len = 15;

    tiles.innerHTML = "";

    for (let i = 0; i < len; i++) {
      tiles.innerHTML += "<p><app-tile></app-tile></p>" + "<br>";
    }
  }

}
