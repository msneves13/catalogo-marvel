import {
    CharacterDataWrapper
} from 'src/app/features/interfaces/characters/character-data-wrapper';

import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { CharacterPageState } from './character-page.state';

@Injectable()
@StoreConfig({ name: 'CharacterPageStore' })
export class CharacterPageStore extends EntityStore<
  CharacterPageState,
  CharacterDataWrapper
> {
  constructor() {
    super();
  }
}
