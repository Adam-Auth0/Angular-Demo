import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdchgdContentComponent } from './pwdchgd-content.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeroComponent } from '../hero/hero.component';

describe('ContentComponent', () => {
  let component: PwdchgdContentComponent;
  let fixture: ComponentFixture<PwdchgdContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [PwdchgdContentComponent, HeroComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdchgdContentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});