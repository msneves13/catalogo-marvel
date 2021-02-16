import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComicPageRoutingModule } from '../../pages/comic/comic-page/comic-page.routing.module';
import { ComicPageDetailsService } from '../../services/comic/comic-page-details.service';
import { ComicCardComponent } from './comic-card.component';

@NgModule({
  imports: [CommonModule, ComicPageRoutingModule],
  declarations: [ComicCardComponent],
  providers: [
    ComicPageDetailsService,
  ],
  exports: [ComicCardComponent],
})
export class ComicCardModule {}
