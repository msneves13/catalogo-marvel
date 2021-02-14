import { Observable } from 'rxjs';
import { ComicDataWrapper } from 'src/app/features/interfaces/comics/comic-data-wrapper';

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { ComicPageState } from './comic-page.state';
import { ComicPageStore } from './comic-page.store';

@Injectable()
export class ComicPageQuery extends QueryEntity<ComicPageState, ComicDataWrapper> {
  public readonly comicDataWrapper$: Observable<
    ComicDataWrapper | undefined
  > = this.selectLast();  
  constructor(protected store: ComicPageStore) {
    super(store);
  }
}