import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeroComponent } from 'src/app/components/hero/hero.component';
import { PwdchgdContentComponent } from 'src/app/components/pwdchgd-content/pwdchgd-content.component';

import { HomeComponent } from './pwdchgd.component';

describe('PwdchgdComponent', () => {
  let component: PwdchgdComponent;
  let fixture: ComponentFixture<PwdchgdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PwdchgdComponent, HeroComponent, PwdchgdContentComponent],
      imports: [FontAwesomeModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdchgdComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
