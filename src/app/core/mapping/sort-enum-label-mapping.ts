import { SortEnum } from '../enums/sort.enum';

export const SortEnumLabelMapping: Record<SortEnum, string> = {
  [SortEnum.EQUAL]: "equal",
  [SortEnum.GREATER]: "greater than",
  [SortEnum.LESS]: "less than",
  [SortEnum.BETWEEN]: "between",
};
