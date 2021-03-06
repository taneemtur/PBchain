import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProfileComponent } from './featured-profile.component';

describe('FeaturedProfileComponent', () => {
  let component: FeaturedProfileComponent;
  let fixture: ComponentFixture<FeaturedProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
