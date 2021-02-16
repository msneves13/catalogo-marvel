import { Observable } from 'rxjs';
import { Comic } from 'src/app/features/interfaces/comic/comic';

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { ComicPageState } from './comic-page.state';
import { ComicPageStore } from './comic-page.store';

@Injectable({
  providedIn: 'root',
})
export class ComicPageQuery extends QueryEntity<ComicPageState, Comic> {
  public readonly comics$ = this.selectAll();
  public readonly comic$ = this.selectActive();
  public readonly currentPage$ = this.select(state => state.ui.currentPage);

  public readonly isLoading$: Observable<boolean> = this.selectLoading();

  constructor(protected store: ComicPageStore) {
    super(store);
  }

  public getCurrentPage() {
    return this.store.getValue().ui.currentPage;
  }

  public getTotalPages() {
    return Math.ceil(
      this.store.getValue().ui.total / this.store.getValue().ui.limit,
    );
  }

  public getTitleStartsWith() {
    return this.store.getValue().ui.titleStartsWith;
  }
}
