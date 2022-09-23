import { TableOrderEnum, TableSortEnum } from './../feature/search/component/result-page/result-page.component';
import { SortEnum } from '../core/enums/sort.enum';
import { SortDateEnum } from './../core/enums/sort-date.enum';
export interface SearchParameters {
    searchBy: string;
    byName: boolean;
    byDescription: boolean;
    byReadme: boolean;

    userName: string;
    organization: string;
    language: Array<string>;
    topic: Array<string>;
    starsSort: SortEnum,
    starsNumber: string,
    sizeSort: SortEnum,
    size: string,
    createdSort: SortDateEnum,
    createdDate: string,
    order: TableOrderEnum,
    sort: TableSortEnum
}
