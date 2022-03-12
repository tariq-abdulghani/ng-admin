import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateComponent } from './create-or-update.component';

describe('CreateOrUpdateComponent', () => {
  let component: CreateOrUpdateComponent;
  let fixture: ComponentFixture<CreateOrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
