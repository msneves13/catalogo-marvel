import {
    CharacterCardModule
} from 'src/app/features/components/character-card/character-card.module';
import { ComicCardModule } from 'src/app/features/components/comic-card/comic-card.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ComicPageDetailsComponent } from '../comic-page-details/comic-page-details.component';
import { ComicPageComponent } from './comic-page.component';
import { ComicPageRoutingModule } from './comic-page.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ComicPageRoutingModule,
    ComicCardModule,
    CharacterCardModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  declarations: [ComicPageComponent, ComicPageDetailsComponent]
})
export class ComicPageModule {}
