import { Component, OnInit } from '@angular/core';

import { ComicService } from '../../services/comic.service';

@Component({
  selector: 'app-comic-page',
  templateUrl: './comic-page.component.html',
  styleUrls: ['./comic-page.component.scss'],
})
export class ComicPageComponent implements OnInit {
  constructor(private comicService: ComicService) {}

  ngOnInit() {
    this.comicService.getComics('1', '1').subscribe();
  }
}
