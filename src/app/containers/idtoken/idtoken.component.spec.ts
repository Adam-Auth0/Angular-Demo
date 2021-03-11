import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightModule } from 'ngx-highlightjs';
import { hljsLanguages } from 'src/app/app.module';

import { IdTokenComponent } from './idtoken.component';

describe('IdTokenComponent', () => {
  let component: IdTokenComponent;
  let fixture: ComponentFixture<IdTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdTokenComponent],
      imports: [
        HighlightModule.forRoot({
          languages: hljsLanguages
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdTokenComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
