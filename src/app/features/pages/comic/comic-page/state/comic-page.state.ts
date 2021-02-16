import { Comic } from 'src/app/features/interfaces/comic/comic';

import { ActiveState, EntityState } from '@datorama/akita';

export interface ComicPageState extends ActiveState, EntityState<Comic> {
  ui: {
    limit: number;
    total: number;
    currentPage: number;
    titleStartsWith: string;
  };
}
