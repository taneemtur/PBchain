import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyPropertyComponent } from './nearby-property.component';

describe('NearbyPropertyComponent', () => {
  let component: NearbyPropertyComponent;
  let fixture: ComponentFixture<NearbyPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearbyPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
