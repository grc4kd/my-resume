import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Firestore } from '@angular/fire/firestore';

let firestoreStub: Partial<Firestore>;
firestoreStub = {

}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: Firestore, useValue: firestoreStub }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'my-resume-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('my-resume-app');
  });
});
