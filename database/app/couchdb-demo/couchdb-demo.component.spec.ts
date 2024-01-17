import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouchdbDemoComponent } from './couchdb-demo.component';

describe('CouchdbDemoComponent', () => {
  let component: CouchdbDemoComponent;
  let fixture: ComponentFixture<CouchdbDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouchdbDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouchdbDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
