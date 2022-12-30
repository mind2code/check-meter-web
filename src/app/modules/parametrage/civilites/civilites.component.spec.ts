import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilitesComponent } from './civilites.component';

describe('CivilitesComponent', () => {
  let component: CivilitesComponent;
  let fixture: ComponentFixture<CivilitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CivilitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CivilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
