import { AngularMaterialModule } from './../../../../angular-material.modules';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QueryHistoryListItemComponent } from './query-history-list-item.component';

xdescribe('QueryHistoryListItemComponent', () => {
  let component: QueryHistoryListItemComponent;
  let fixture: ComponentFixture<QueryHistoryListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryHistoryListItemComponent ],
      imports: [AngularMaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryHistoryListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
