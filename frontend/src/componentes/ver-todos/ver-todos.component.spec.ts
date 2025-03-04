import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTodosComponent } from './ver-todos.component';

describe('VerTodosComponent', () => {
  let component: VerTodosComponent;
  let fixture: ComponentFixture<VerTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerTodosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
