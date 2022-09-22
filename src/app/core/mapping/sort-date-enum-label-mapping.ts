import { SortDateEnum } from './../enums/sort-date.enum';

export const SortDateEnumLabelMapping: Record<SortDateEnum, string> = {
  [SortDateEnum.BEFORE]: "before",
  [SortDateEnum.AFTER]: "after",
  [SortDateEnum.ONORBEFORE]: "on or before",
  [SortDateEnum.ONORAFTER]: "on or after",
  [SortDateEnum.BETWEEN]: "between",
};
