import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAssemblerComponent } from './grid-assembler.component';

describe('GridAssemblerComponent', () => {
  let component: GridAssemblerComponent;
  let fixture: ComponentFixture<GridAssemblerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAssemblerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAssemblerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
