import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComicPageComponent } from './comic-page.component';

const routes: Routes = [
  {
    path: '',
    component: ComicPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicPageRoutingModule {}
