import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComicPageDetailsComponent } from '../comic-page-details/comic-page-details.component';
import { ComicPageComponent } from './comic-page.component';

const routes: Routes = [
  {
    path: '',
    component: ComicPageComponent,
  },
  {
    path: 'details/:id',
    component: ComicPageDetailsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicPageRoutingModule {}
