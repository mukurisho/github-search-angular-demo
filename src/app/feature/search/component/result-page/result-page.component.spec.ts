import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ResultPageComponent } from './result-page.component';
import { AngularMaterialModule } from 'src/app/angular-material.modules';
import { ActionsSubject, ReducerManager, StateObservable, Store, StoreModule } from '@ngrx/store';
import { searchReducer } from 'src/app/store/search/search-reducer';
import { historyReducer } from 'src/app/store/history/history-reducer';

describe('ResultPageComponent', () => {
  let component: ResultPageComponent;
  let fixture: ComponentFixture<ResultPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultPageComponent ],
      imports: [
        AngularMaterialModule,
        StoreModule.forRoot({
          search: searchReducer,
          searchParamsHistory: historyReducer,
        }),
        BrowserAnimationsModule
      ],
      providers: [
        Store,
        StateObservable,
        ActionsSubject,
        ReducerManager
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    component.hasApiError = true;
    fixture.detectChanges();
    const hostElement: HTMLElement = fixture.nativeElement;
    let table = hostElement.querySelector('#result-table')
    expect(table).toBeFalsy();
  });

  it('should create', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    let resultData = {items: [
      {
        full_name: 'test john',
        description: 'test desc',
        owner: {
          login: 'test_user'
        }
      }
    ]}
    component.setDataSource(resultData);
    fixture.detectChanges();
    const column = hostElement.querySelector('#name-col');
    expect(column?.textContent).toBe(' test john ')
  });

  it('Test a from group element count', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    const formElement = hostElement.querySelector('#order-form');
    const inputElements = formElement?.querySelectorAll('.radio-btn');
    expect(inputElements?.length).toEqual(5)
  })

  it('check initial form values', () => {
    const orderFormGroup = component.orderForm;
    const formValues = {
      sort: '',
      order: ''
    }
    expect(orderFormGroup.value).toEqual(formValues)
  })
});
