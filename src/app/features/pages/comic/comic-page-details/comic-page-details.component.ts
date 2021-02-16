import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Character } from 'src/app/features/interfaces/character/character';
import {
    ComicPageDetailsService
} from 'src/app/features/services/comic/comic-page-details.service';
import { ComicPageService } from 'src/app/features/services/comic/comic-page.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ID } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';

import { ComicPageQuery } from '../comic-page/state/comic-page.query';

@Component({
  selector: 'app-comic-page-details',
  templateUrl: './comic-page-details.component.html',
  styleUrls: ['./comic-page-details.component.scss'],
})
export class ComicPageDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private routerQuery: RouterQuery,
    private comicPageQuery: ComicPageQuery,
    private comicPageService: ComicPageService,
    private comicPageDetailsService: ComicPageDetailsService,
  ) {}

  public readonly comic$ = this.comicPageQuery.comic$;
  public recommendedCharacters$: Observable<Character[]>;

  public thumbnail$: Observable<string>;
  public emptyMessage = 'This comic has no synopsis.';

  private destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
    const id = this.routerQuery.getParams('id');
    this.comicPageService
      .getComicById(`${id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.thumbnail$ = this.comic$.pipe(
      filter(comic => !!comic),
      map(comic => `${comic?.thumbnail.path}.${comic?.thumbnail.extension}`),
    );

    this.recommendedCharacters$ = this.comic$.pipe(
      filter(comic => !!comic),
      switchMap(comic =>
        this.comicPageDetailsService.getCharacterByComicId(comic?.id, '3'),
      ),
    );
  }

  setActiveCharacter(id: ID) {
    this.router.navigate([`characters/details/${id}`]);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
