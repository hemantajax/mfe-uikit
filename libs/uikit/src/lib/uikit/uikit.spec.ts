import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uikit } from './uikit';

describe('Uikit', () => {
  let component: Uikit;
  let fixture: ComponentFixture<Uikit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uikit],
    }).compileComponents();

    fixture = TestBed.createComponent(Uikit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
