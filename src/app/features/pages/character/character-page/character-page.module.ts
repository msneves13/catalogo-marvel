import {
    CharacterCardModule
} from 'src/app/features/components/character-card/character-card.module';
import { ComicCardModule } from 'src/app/features/components/comic-card/comic-card.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
    CharacterPageDetailsComponent
} from '../character-page-details/character-page-details.component';
import { CharacterPageComponent } from './character-page.component';
import { CharacterPageRoutingModule } from './character-page.routing.module';

@NgModule({
  imports: [
    CommonModule,
    CharacterPageRoutingModule,
    ComicCardModule,
    CharacterCardModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  declarations: [CharacterPageComponent, CharacterPageDetailsComponent],
})
export class CharacterPageModule {}
