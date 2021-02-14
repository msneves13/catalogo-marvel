import { Component, OnInit } from '@angular/core';

import { CharacterService } from './features/services/character.service';
import { ComicService } from './features/services/comic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'catalogo-marvel';

  constructor() {}

  public readonly pageIndex = 0;
  public readonly pageSize = 10;

  ngOnInit() {}
}
