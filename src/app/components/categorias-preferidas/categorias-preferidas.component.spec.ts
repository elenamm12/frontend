import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasPreferidasComponent } from './categorias-preferidas.component';

describe('CategoriasPreferidasComponent', () => {
  let component: CategoriasPreferidasComponent;
  let fixture: ComponentFixture<CategoriasPreferidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasPreferidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasPreferidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
