import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CharacterService } from '../../services/character.service';
import { CharacterPageComponent } from './character-page.component';
import { CharacterPageRoutingModule } from './character-page.routing.module';
import { CharacterPageQuery } from './state/character-page.query';
import { CharacterPageStore } from './state/character-page.store';

@NgModule({
  imports: [CommonModule, CharacterPageRoutingModule],
  declarations: [CharacterPageComponent],
  providers: [CharacterPageStore, CharacterPageQuery, CharacterService],
})
export class CharacterPageModule {}
