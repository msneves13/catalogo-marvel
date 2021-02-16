import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    CharacterPageRoutingModule
} from '../../pages/character/character-page/character-page.routing.module';
import {
    CharacterPageDetailsService
} from '../../services/character/character-page-details.service';
import { CharacterCardComponent } from './character-card.component';

@NgModule({
  imports: [CommonModule, CharacterPageRoutingModule],
  declarations: [CharacterCardComponent],
  providers: [
    CharacterPageDetailsService,
  ],
  exports: [CharacterCardComponent],
})
export class CharacterCardModule {}
