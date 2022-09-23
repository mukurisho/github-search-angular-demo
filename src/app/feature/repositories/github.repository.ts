import { TableOrderEnum, TableSortEnum } from './../search/component/result-page/result-page.component';
import { SortDateEnum } from './../../core/enums/sort-date.enum';
import { SortEnum } from './../../core/enums/sort.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class GithubRepository {

  constructor(
    private readonly http: HttpClient,
    private datePipe: DatePipe
  ) { }

  getUser(searchParams: any): Observable<any> {
    let url = env.githubUrl;
    let languages: string = '';
    let topics: string = ''
    if (searchParams.language.length > 0) {
      searchParams.language.forEach((lang: string) => {
        languages = `${languages} ${lang}`
      });
    }
    if (searchParams.topic.length > 0) {
      searchParams.language.forEach((lang: string) => {
        topics = `${languages} ${lang}`
      });
    }
    let sortParam = '';
    switch (searchParams.sort) {
      case TableSortEnum.FORKS:
        sortParam = 'forks'
        break;
      case TableSortEnum.STARS:
        sortParam = 'stars'
        break;

      default:
        sortParam = ''
        break;
    }
let params = `\
${searchParams.searchBy}\
${(searchParams.byName) ? ' in:name' : ''}\
${(searchParams.byDescription) ? ' in:description' : ''}\
${(searchParams.byReadme) ? ' in:readme' : ''}\
${(searchParams.byReadme) ? ' in:readme' : ''}\
${(searchParams.language.length>0) ? ` language:${languages}` : ''}\
${(searchParams.topic.length>0) ? ` topic:${topics}` : ''}\
${(searchParams.starsSort === SortEnum.EQUAL) ? ` stars:${searchParams.starsNumber}` : ''}\
${(searchParams.starsSort === SortEnum.GREATER) ? ` stars:<${searchParams.starsNumber}` : ''}\
${(searchParams.starsSort === SortEnum.LESS) ? ` stars:>${searchParams.starsNumber}` : ''}\
${(searchParams.starsSort === SortEnum.BETWEEN) ? ` stars:${searchParams.starsMin}..${searchParams.starsMax}` : ''}\
${(searchParams.sizeSort === SortEnum.EQUAL) ? ` size:${searchParams.size}` : ''}\
${(searchParams.sizeSort === SortEnum.GREATER) ? ` size:<${searchParams.size}` : ''}\
${(searchParams.sizeSort === SortEnum.LESS) ? ` size:>${searchParams.size}` : ''}\
${(searchParams.sizeSort === SortEnum.BETWEEN) ? ` size:${searchParams.sizeMin}..${searchParams.sizeMax}` : ''}\
${(searchParams.createdSort === SortDateEnum.AFTER) ? ` created:>${this.datePipe.transform(searchParams.createdDate, 'yyyy-MM-dd')}` : ''}\
${(searchParams.createdSort === SortDateEnum.BEFORE) ? ` created:<${this.datePipe.transform(searchParams.createdDate, 'yyyy-MM-dd')}` : ''}\
${(searchParams.createdSort === SortDateEnum.ONORAFTER) ? ` created:>=${this.datePipe.transform(searchParams.createdDate, 'yyyy-MM-dd')}` : ''}\
${(searchParams.createdSort === SortDateEnum.ONORBEFORE) ? ` created:<=${this.datePipe.transform(searchParams.createdDate, 'yyyy-MM-dd')}` : ''}\
${(searchParams.createdSort === SortDateEnum.BETWEEN) ? ` created:${this.datePipe.transform(searchParams.createdMin, 'yyyy-MM-dd')}..${this.datePipe.transform(searchParams.createdMax, 'yyyy-MM-dd')}` : ''}\
&order=${(searchParams.order === TableOrderEnum.ASC) ? 'asc' : (searchParams.order === TableOrderEnum.DESC) ? 'desc' : ''}\
&sort=${sortParam}`;
    return this.http.get<any>(`${url}/search/repositories?q=${params}`);
  }
}
