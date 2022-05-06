import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistBarComponent } from './artist-bar.component';

describe('ArtistBarComponent', () => {
  let component: ArtistBarComponent;
  let fixture: ComponentFixture<ArtistBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
