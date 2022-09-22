import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { SearchParameters } from 'src/app/models/search-parameters';
import { search } from 'src/app/store/search/search-actions';
import { selectResults } from 'src/app/store/search/search-selectors';
import { SortDateEnumLabelMapping } from 'src/app/core/mapping/sort-date-enum-label-mapping';
import { SortEnum } from 'src/app/core/enums/sort.enum';
import { SortEnumLabelMapping } from 'src/app/core/mapping/sort-enum-label-mapping';
import { SortDateEnum } from 'src/app/core/enums/sort-date.enum';

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

  result$ = this._store.pipe(select(selectResults));
  constructor(private _store: Store) {
    this.createForm();
  }

  ngOnInit(): void {

  }

  createForm(): void {
    this.searchForm = new FormGroup({
      searchBy: new FormControl('', [Validators.required, Validators.minLength(3)]),
      byName: new FormControl(false),
      byDescription: new FormControl(false),
      byReadme: new FormControl(false),
      userName: new FormControl('', [Validators.minLength(3)]),
      organization: new FormControl('', [Validators.minLength(3)]),
      language: new FormControl('', [Validators.minLength(3)]),
      topic: new FormControl('', [Validators.minLength(3)]),
      starsSort: new FormControl(''),
      starsNumber: new FormControl(''),
      sizeSort: new FormControl(''),
      size: new FormControl(''),
      createdSort: new FormControl(''),
      createdDate: new FormControl(''),

    });
  }

  onSearch() {
    if (this.searchForm.valid) {
      const searchParams: SearchParameters = this.searchForm.getRawValue();
      this._store.dispatch(
        search({
          searchParams,
        })
      );
    }
  }

  onReset() {}

}
