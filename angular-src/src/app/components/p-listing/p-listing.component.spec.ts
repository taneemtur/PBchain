import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PListingComponent } from './p-listing.component';

describe('PListingComponent', () => {
  let component: PListingComponent;
  let fixture: ComponentFixture<PListingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
