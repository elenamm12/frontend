import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearForoComponent } from './crear-foro.component';

describe('CrearForoComponent', () => {
  let component: CrearForoComponent;
  let fixture: ComponentFixture<CrearForoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearForoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
