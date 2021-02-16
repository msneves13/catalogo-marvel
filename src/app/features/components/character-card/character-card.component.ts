import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ID } from '@datorama/akita';

import { Character } from '../../interfaces/character/character';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent implements OnInit{
  @Input() character: Character;
  @Output() clicked: EventEmitter<ID> = new EventEmitter();

  public thumbnail: string;

  constructor() {}

  ngOnInit() {
    this.thumbnail = `${this.character?.thumbnail?.path}.${this.character?.thumbnail?.extension}`;
  }

  selectCharacter() {
    this.clicked.emit(this.character.id);
  }
}
