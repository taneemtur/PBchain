import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedDevelopersComponent } from './featured-developers.component';

describe('FeaturedDevelopersComponent', () => {
  let component: FeaturedDevelopersComponent;
  let fixture: ComponentFixture<FeaturedDevelopersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedDevelopersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedDevelopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
