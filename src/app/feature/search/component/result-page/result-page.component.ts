import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ApiStatus } from 'src/app/models/api-status.enum';
import { selectResultHistoryItem } from 'src/app/store/history/history-selectors';
import { selectResults, selectSearchApiStatus } from 'src/app/store/search/search-selectors';
export interface tableDataModel {
  name: string;
  url: string;
  statistic: any;
  description: string;
  languages: string;
  date: any;
  owner: any;
  avatar: any;
}
@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements AfterViewInit {
  repositories: tableDataModel[] = [];
  displayedColumns: string[] = [
    'name',
    'statistic',
    'description',
    'languages',
    'date',
    'owner',
    'avatar',
  ];
  dataSource: MatTableDataSource<any>;
  searchData$ = this._store.pipe(select(selectResults));
  apiStatus$ = this._store.pipe(select(selectSearchApiStatus));
  historyList$ = this._store.pipe(select(selectResultHistoryItem));
  isLoading: boolean = false;
  data: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _store: Store,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();

    if (this.router.url.includes('search')) {
      this.searchData$.subscribe((res) => {
        if (res && res.items) {
          this.repositories = [];
          this.setDataSource(res);
        }
      });
    } else {
      this.historyList$.subscribe((res) => {
        if (res && res.length>0) {
          this.repositories = [];
          this.setDataSource({items: res});
        }
      })
    }

    this.apiStatus$.subscribe(status => this.isLoading = (status === ApiStatus.Loading) ? true : false)
  }

  setDataSource(data: any): void {
    data.items.forEach((row: any) => {
      let repo: tableDataModel = {
        name: row.full_name,
        url: row.html_url,
        statistic: {stars: row.stargazers_count, forks: row.forks_count, watchers: row.watchers_count, issues: row.open_issues_count},
        description: row.description,
        languages: row.language,
        date: { createdAt: row.created_at, updatedAt: row.updated_at },
        owner: row.owner.login,
        avatar: {avatarUrl: row.owner.avatar_url, profileUrl: row.owner.html_url},
      };
      this.repositories.push(repo);
      this.dataSource = new MatTableDataSource(this.repositories);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUrl(url: string): void {
    window.open(url, '_blank');
  }
}
