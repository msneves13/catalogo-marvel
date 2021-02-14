import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComicService } from '../../services/comic.service';
import { ComicPageComponent } from './comic-page.component';
import { ComicPageRoutingModule } from './comic-page.routing.module';
import { ComicPageQuery } from './state/comic-page.query';
import { ComicPageStore } from './state/comic-page.store';

@NgModule({
  imports: [CommonModule, ComicPageRoutingModule],
  declarations: [ComicPageComponent],
  providers: [ComicPageStore, ComicPageQuery, ComicService],
})
export class ComicPageModule {}
