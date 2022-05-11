import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCrudTableComponent } from './dynamic-crud-table.component';

describe('DynamicCrudTableComponent', () => {
  let component: DynamicCrudTableComponent;
  let fixture: ComponentFixture<DynamicCrudTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicCrudTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
