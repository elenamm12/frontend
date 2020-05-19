import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPorPalabrasComponent } from './buscar-por-palabras.component';

describe('BuscarPorPalabrasComponent', () => {
  let component: BuscarPorPalabrasComponent;
  let fixture: ComponentFixture<BuscarPorPalabrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarPorPalabrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPorPalabrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
