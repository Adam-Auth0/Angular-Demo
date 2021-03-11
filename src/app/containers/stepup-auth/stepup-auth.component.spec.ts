import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StepupAuthComponent } from './stepup-auth.component';
import { HighlightModule } from 'ngx-highlightjs';
import { hljsLanguages } from 'src/app/app.module';

describe('StepupAuthComponent', () => {
  let component: StepupAuthComponent;
  let fixture: ComponentFixture<StepupAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepupAuthComponent],
      imports: [
        HighlightModule.forRoot({
          languages: hljsLanguages
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepupAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
