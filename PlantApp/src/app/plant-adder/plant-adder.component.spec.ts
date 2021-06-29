import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantAdderComponent } from './plant-adder.component';

describe('PlantAdderComponent', () => {
  let component: PlantAdderComponent;
  let fixture: ComponentFixture<PlantAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantAdderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
