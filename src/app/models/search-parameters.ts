import { SortEnum } from '../core/enums/sort.enum';
import { SortDateEnum } from './../core/enums/sort-date.enum';
export interface SearchParameters {
    searchBy: string;
    byName: boolean;
    byDescription: boolean;
    byReadme: boolean;

    userName: string;
    organization: string;
    language: string;
    topic: string;
    starsSort: SortEnum,
    starsNumber: string,
    sizeSort: SortEnum,
    size: string,
    createdSort: SortDateEnum,
    createdDate: string,
}
