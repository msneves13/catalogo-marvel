import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ID } from '@datorama/akita';

import { Comic } from '../../interfaces/comic/comic';

@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.scss'],
})
export class ComicCardComponent implements OnInit {
  @Input() comic: Comic;
  @Output() clicked: EventEmitter<ID> = new EventEmitter();

  public thumbnail: string;

  constructor() {}

  ngOnInit() {
    this.thumbnail = `${this.comic?.thumbnail?.path}.${this.comic?.thumbnail?.extension}`;
  }

  selectComic() {
    this.clicked.emit(this.comic.id);
  }
}
