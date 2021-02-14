import { ComicDataWrapper } from 'src/app/features/interfaces/comics/comic-data-wrapper';

import { EntityState } from '@datorama/akita';

export interface ComicPageState extends EntityState<ComicDataWrapper> {}
