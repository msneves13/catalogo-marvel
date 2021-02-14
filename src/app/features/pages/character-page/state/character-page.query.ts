import { Observable } from 'rxjs';
import {
    CharacterDataWrapper
} from 'src/app/features/interfaces/characters/character-data-wrapper';

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { CharacterPageState } from './character-page.state';
import { CharacterPageStore } from './character-page.store';

@Injectable()
export class CharacterPageQuery extends QueryEntity<
  CharacterPageState,
  CharacterDataWrapper
> {
  public readonly characterDataWrapper$: Observable<
    CharacterDataWrapper | undefined
  > = this.selectLast();

  public readonly isLoading$: Observable<boolean> = this.selectLoading();

  constructor(protected store: CharacterPageStore) {
    super(store);
  }
}
