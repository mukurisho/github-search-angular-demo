import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { SearchParameters } from 'src/app/models/search-parameters';
import { search } from 'src/app/store/search/search-actions';
import { selectResults } from 'src/app/store/search/search-selectors';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  searchForm: FormGroup;

  result$ = this._store.pipe(select(selectResults));
  constructor(private _store: Store) {
    this.createForm();
  }

  ngOnInit(): void {

  }

  createForm(): void {
    this.searchForm = new FormGroup({
      searchBy: new FormControl(''),
      byName: new FormControl(false),
      byDescription: new FormControl(false),
      byReadme: new FormControl(false),
      userName: new FormControl(''),
      organization: new FormControl(''),
      language: new FormControl(''),
      topic: new FormControl(''),
      starsSort: new FormControl(''),
      starsNumber: new FormControl(''),
      sizeSort: new FormControl(''),
      size: new FormControl(''),
      createdSort: new FormControl(''),
      createdDate: new FormControl(''),

    });
  }

  onSearch() {
    console.log(this.searchForm.value);
    const searchParams: SearchParameters = this.searchForm.getRawValue();
    this._store.dispatch(
      search({
        searchParams,
      })
    );
  }

  onReset() {}
}
