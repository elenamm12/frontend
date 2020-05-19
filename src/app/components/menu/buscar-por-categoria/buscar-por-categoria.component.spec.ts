import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPorCategoriaComponent } from './buscar-por-categoria.component';

describe('BuscarPorCategoriaComponent', () => {
  let component: BuscarPorCategoriaComponent;
  let fixture: ComponentFixture<BuscarPorCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarPorCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPorCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
