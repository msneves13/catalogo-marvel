import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { faBookOpen, faMask } from '@fortawesome/free-solid-svg-icons';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full',
  },
  {
    path: 'comics',
    loadChildren: () =>
      import('./features/pages/comic/comic-page/comic-page.module').then(
        m => m.ComicPageModule,
      ),
    data: {
      label: 'Comics',
      icon: faBookOpen,
    },
  },
  {
    path: 'characters',
    loadChildren: () =>
      import(
        './features/pages/character/character-page/character-page.module'
      ).then(m => m.CharacterPageModule),
    data: {
      label: 'Characters',
      icon: faMask,
    },
  },
  {
    path: '**',
    redirectTo: 'characters',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
