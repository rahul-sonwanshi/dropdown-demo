import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatMultiSelectSearchComponent } from './mat-multi-select-search.component';

describe('MatMultiSelectSearchComponent', () => {
  let component: MatMultiSelectSearchComponent;
  let fixture: ComponentFixture<MatMultiSelectSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatMultiSelectSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatMultiSelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
