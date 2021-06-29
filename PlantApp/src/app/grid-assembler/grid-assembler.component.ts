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
  }
  public getData() {
    const getPlants = this.dataService.getUserPlants(this.authService.getToken());
    getPlants.subscribe(res => {
      console.log(JSON.stringify(res))
    })
  }
}
