import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setSelectedQueryIndex } from 'src/app/store/history/history-actions';
import { selectQueryHistoryList } from 'src/app/store/history/history-selectors';

@Component({
  selector: 'app-search-query-history-list',
  templateUrl: './search-query-history-list.component.html',
  styleUrls: ['./search-query-history-list.component.scss']
})
export class SearchQueryHistoryListComponent {

  queryHistoryList$ = this._store.pipe(select(selectQueryHistoryList));
  selectedQuery: number

  constructor(private _store: Store) { }

  selectItem(index: number) {
    this.selectedQuery = index;
    this._store.dispatch(
      setSelectedQueryIndex({
        index
      })
    )
  }

}
