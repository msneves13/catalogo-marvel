import { Character } from 'src/app/features/interfaces/character/character';

import { ActiveState, EntityState } from '@datorama/akita';

export interface CharacterPageState extends ActiveState, EntityState<Character> {
  ui: {
    limit: number;
    total: number;
    currentPage: number;
    nameStartsWith: string;
  };
}
