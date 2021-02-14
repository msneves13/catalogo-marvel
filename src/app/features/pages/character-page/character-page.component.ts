import { Component, OnInit } from '@angular/core';

import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.scss']
})
export class CharacterPageComponent implements OnInit {

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.getCharacters('1', '1').subscribe();
  }

}
