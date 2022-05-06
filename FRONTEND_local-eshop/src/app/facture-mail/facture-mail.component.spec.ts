import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureMailComponent } from './facture-mail.component';

describe('FactureMailComponent', () => {
  let component: FactureMailComponent;
  let fixture: ComponentFixture<FactureMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
