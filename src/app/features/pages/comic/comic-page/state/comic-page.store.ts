import { Comic } from 'src/app/features/interfaces/comic/comic';

import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { ComicPageState } from './comic-page.state';

const limit = 20;
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'ComicPageStore' })
export class ComicPageStore extends EntityStore<ComicPageState, Comic> {
  constructor() {
    super({
      ui: {
        total: 0,
        limit: limit,
        currentPage: 0,
        titleStartsWith: '',
      },
    });
  }

  public updateTotal(total: number): void {
    this.update(state => ({
      ui: { ...state.ui, total: total },
    }));
  }

  public updateCurrentPage(currentPage: number): void {
    this.update(state => ({
      ui: { ...state.ui, currentPage: currentPage },
    }));
  }

  public resetCurrentPage(): void {
    this.update(state => ({
      ui: { ...state.ui, currentPage: 0 },
    }));
  }

  public updateTitleStartsWith(titleStartsWith: string): void {
    this.update(state => ({
      ui: { ...state.ui, titleStartsWith: titleStartsWith },
    }));
  }
}
