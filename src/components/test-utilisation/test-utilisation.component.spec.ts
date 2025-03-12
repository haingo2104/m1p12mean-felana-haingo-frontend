import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUtilisationComponent } from './test-utilisation.component';

describe('TestUtilisationComponent', () => {
  let component: TestUtilisationComponent;
  let fixture: ComponentFixture<TestUtilisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestUtilisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestUtilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
