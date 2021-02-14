import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full',
  },
  {
    path: 'comics',
    loadChildren: () =>
      import('./features/pages/comic-page/comic-page.module').then(
        (m) => m.ComicPageModule
      ),
    pathMatch: 'full',
    data: {
      label: 'Comics',
    },
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./features/pages/character-page/character-page.module').then(
        (m) => m.CharacterPageModule
      ),
    pathMatch: 'full',
    data: {
      label: 'Characters',
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
