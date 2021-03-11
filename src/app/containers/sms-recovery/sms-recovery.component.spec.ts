import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SmsRecoveryComponent } from './sms-recovery.component';
import { HighlightModule } from 'ngx-highlightjs';
import { hljsLanguages } from 'src/app/app.module';

describe('SmsRecoveryComponent', () => {
  let component: SmsRecoveryComponent;
  let fixture: ComponentFixture<SmsRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SmsRecoveryComponent],
      imports: [
        HighlightModule.forRoot({
          languages: hljsLanguages
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
