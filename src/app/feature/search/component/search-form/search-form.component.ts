import {COMMA, ENTER, TAB} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { SearchParameters } from 'src/app/models/search-parameters';
import { search, searchSuccess } from 'src/app/store/search/search-actions';
import { selectResults } from 'src/app/store/search/search-selectors';
import { SortDateEnumLabelMapping } from 'src/app/core/mapping/sort-date-enum-label-mapping';
import { SortEnum } from 'src/app/core/enums/sort.enum';
import { SortEnumLabelMapping } from 'src/app/core/mapping/sort-enum-label-mapping';
import { SortDateEnum } from 'src/app/core/enums/sort-date.enum';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchForm: FormGroup;
  public sortEnum = SortEnum;
  public sortDateEnum = SortDateEnum;
  public sortLabels = Object.values(SortEnum);
  public sortEnumLabelMapping = SortEnumLabelMapping;
  public sortDateLabels = Object.values(SortDateEnum);
  public sortDateEnumLabelMapping = SortDateEnumLabelMapping;

  public languageList: Array<string> = [];
  public topicList: Array<string> = [];
  result$ = this._store.pipe(select(selectResults));
  constructor(private _store: Store) {
    this.createForm();
  }
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, TAB] as const;

  ngOnInit(): void {

  }

  createForm(): void {
    this.searchForm = new FormGroup({
      searchBy: new FormControl('', [Validators.required, Validators.minLength(3)]),
      byName: new FormControl(true),
      byDescription: new FormControl(false),
      byReadme: new FormControl(false),
      userName: new FormControl('', [Validators.minLength(3)]),
      organization: new FormControl('', [Validators.minLength(3)]),
      language: new FormControl(''),
      topic: new FormControl(''),
      starsSort: new FormControl(''),
      starsNumber: new FormControl(''),
      starsMin: new FormControl(''),
      starsMax: new FormControl(''),
      sizeSort: new FormControl(''),
      size: new FormControl(''),
      sizeMin: new FormControl(''),
      sizeMax: new FormControl(''),
      createdSort: new FormControl(''),
      createdDate: new FormControl(''),
      createdMin: new FormControl(''),
      createdMax: new FormControl(''),

    });
  }

  deleteLang(lang: string) {
    const index = this.languageList.indexOf(lang);

    if (index >= 0) {
      this.languageList.splice(index, 1);
    }
  }

  addLang(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.languageList.push(value);
    }
    event.chipInput!.clear();
  }

  deleteTopic(lang: string) {
    const index = this.topicList.indexOf(lang);

    if (index >= 0) {
      this.topicList.splice(index, 1);
    }
  }

  addTopic(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.topicList.push(value);
    }
    event.chipInput!.clear();
  }


  onSearch() {
    if (this.searchForm.valid) {
      const searchParams: SearchParameters = this.searchForm.getRawValue();
      searchParams.language = this.languageList;
      searchParams.topic = this.topicList;
      this._store.dispatch(
        search({
          searchParams,
        })
      );
    }
  }

  onReset() {
    this.createForm();
    this.searchForm.get('searchBy')?.clearValidators();
    this.searchForm.get('userName')?.clearValidators();
    this.searchForm.get('organization')?.clearValidators();
    this._store.dispatch(
      searchSuccess({
        results: {items: []},
      })
    );
  }

}
