import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedAgencyComponent } from './featured-agency.component';

describe('FeaturedAgencyComponent', () => {
  let component: FeaturedAgencyComponent;
  let fixture: ComponentFixture<FeaturedAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedAgencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
