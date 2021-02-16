import { Observable } from 'rxjs';
import { Character } from 'src/app/features/interfaces/character/character';

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { CharacterPageState } from './character-page.state';
import { CharacterPageStore } from './character-page.store';

@Injectable({
  providedIn: 'root',
})
export class CharacterPageQuery extends QueryEntity<CharacterPageState, Character> {
  public readonly characters$ = this.selectAll();
  public readonly character$ = this.selectActive();
  public readonly currentPage$ = this.select(state => state.ui.currentPage);

  public readonly isLoading$: Observable<boolean> = this.selectLoading();

  constructor(protected store: CharacterPageStore) {
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

  public getNameStartsWith() {
    return this.store.getValue().ui.nameStartsWith;
  }
}
