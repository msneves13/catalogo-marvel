import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    CharacterPageDetailsComponent
} from '../character-page-details/character-page-details.component';
import { CharacterPageComponent } from './character-page.component';

const routes: Routes = [
  {
    path: '',
    component: CharacterPageComponent,
  },
  {
    path: 'details/:id',
    component: CharacterPageDetailsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterPageRoutingModule {}
