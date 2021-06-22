import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-grid-assembler',
  templateUrl: './grid-assembler.component.html',
  styleUrls: ['./grid-assembler.component.css']
})
export class GridAssemblerComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }


  private getData() {
    this.dataService.getUserPlants().subscribe(res => {
      const json = res;
      console.log(JSON.stringify(res))
    });
    
    
  }

}
