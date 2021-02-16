import { Character } from 'src/app/features/interfaces/character/character';

import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { CharacterPageState } from './character-page.state';

const limit = 20;
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'CharacterPageStore' })
export class CharacterPageStore extends EntityStore<CharacterPageState, Character> {
  constructor() {
    super({
      ui: {
        total: 0,
        limit: limit,
        currentPage: 0,
        nameStartsWith: '',
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

  public updateNameStartsWith(nameStartsWith: string): void {
    this.update(state => ({
      ui: { ...state.ui, nameStartsWith: nameStartsWith },
    }));
  }
}
