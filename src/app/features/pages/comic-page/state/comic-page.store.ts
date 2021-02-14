import { ComicDataWrapper } from 'src/app/features/interfaces/comics/comic-data-wrapper';

import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { ComicPageState } from './comic-page.state';

@Injectable()
@StoreConfig({name: 'ComicPageStore'})
export class ComicPageStore extends EntityStore<
  ComicPageState,
  ComicDataWrapper
> {
  constructor() {
    super();
  }
}
