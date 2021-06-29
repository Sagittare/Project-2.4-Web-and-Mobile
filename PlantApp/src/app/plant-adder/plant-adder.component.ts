import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-plant-adder',
  templateUrl: './plant-adder.component.html',
  styleUrls: ['./plant-adder.component.css']
})
export class PlantAdderComponent implements OnInit{

  plantAdderForm = this.formBuilder.group({
    plantName: '',
    description: '',
    notificationfrequency: '',
    waterAmount: '',
    minTemp: '',
    maxTemp: ''
  });

  userplantAdderForm = this.formBuilder.group({
    plantIDSelector: '',
    plantName: '',
    description: '',
  });
  

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getPlants();
  }


  addPlant() {
    this.dataService.addPlant(this.plantAdderForm.value.plantName, this.plantAdderForm.value.description, this.plantAdderForm.value.notificationFrequency, this.plantAdderForm.value.wateramount, this.plantAdderForm.value.minTemp, this.plantAdderForm.value.maxTemp).subscribe();
  }

  addUserplant() {
    this.dataService.setUserPlant(this.userplantAdderForm.value.plantIDSelector, this.userplantAdderForm.value.description, this.userplantAdderForm.value.plantName, this.auth.getToken()).subscribe();
  }

  getPlants() {
    this.dataService.getPlants().subscribe(result => this.populateSelector(result));
  }

  populateSelector(plantsJSON) {
    var select= document.getElementById("plantIDSelector"); 

    select.innerHTML = "";
    plantsJSON.forEach(plant => {

      select.innerHTML += "<option value=\"" + plant.plantID + "\">" + plant.name + "</option>";

    });
  }
}
