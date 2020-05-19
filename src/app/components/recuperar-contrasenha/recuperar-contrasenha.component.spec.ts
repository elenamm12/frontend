import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarContrasenhaComponent } from './recuperar-contrasenha.component';

describe('RecuperarContrasenhaComponent', () => {
  let component: RecuperarContrasenhaComponent;
  let fixture: ComponentFixture<RecuperarContrasenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperarContrasenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarContrasenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
