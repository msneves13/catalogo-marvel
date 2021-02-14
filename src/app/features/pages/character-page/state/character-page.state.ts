import {
    CharacterDataWrapper
} from 'src/app/features/interfaces/characters/character-data-wrapper';

import { EntityState } from '@datorama/akita';

export interface CharacterPageState extends EntityState<CharacterDataWrapper> {}
