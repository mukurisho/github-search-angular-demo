/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchQueryHistoryListComponent } from './search-query-history-list.component';
import { AngularMaterialModule } from 'src/app/angular-material.modules';
import { ActionsSubject, ReducerManager, ReducerManagerDispatcher, StateObservable, Store, StoreModule } from '@ngrx/store';
import { searchReducer } from 'src/app/store/search/search-reducer';
import { historyReducer } from 'src/app/store/history/history-reducer';

describe('SearchQueryHistoryListComponent', () => {
  let component: SearchQueryHistoryListComponent;
  let fixture: ComponentFixture<SearchQueryHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchQueryHistoryListComponent ],
      imports: [
        AngularMaterialModule,
        StoreModule.forRoot({
          search: searchReducer,
          searchParamsHistory: historyReducer,
        }),
      ],
      providers: [
        Store,
        // StateObservable,
        // ActionsSubject,
        // ReducerManager,
        // ReducerManagerDispatcher
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchQueryHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
