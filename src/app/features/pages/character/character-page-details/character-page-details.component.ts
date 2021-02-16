import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Comic } from 'src/app/features/interfaces/comic/comic';
import {
    CharacterPageDetailsService
} from 'src/app/features/services/character/character-page-details.service';
import { CharacterPageService } from 'src/app/features/services/character/character-page.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ID } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';

import { CharacterPageQuery } from '../character-page/state/character-page.query';

@Component({
  selector: 'app-character-page-details',
  templateUrl: './character-page-details.component.html',
  styleUrls: ['./character-page-details.component.scss'],
})
export class CharacterPageDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private routerQuery: RouterQuery,
    private characterPageQuery: CharacterPageQuery,
    private characterPageService: CharacterPageService,
    private characterPageDetailsService: CharacterPageDetailsService,
  ) {}

  public readonly character$ = this.characterPageQuery.character$;
  public recommendedComics$: Observable<Comic[]>;

  public thumbnail$: Observable<string>;
  public emptyMessage = 'This character has no synopsis.';

  private destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
    const id = this.routerQuery.getParams('id');
    this.characterPageService
      .getCharacterById(`${id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.thumbnail$ = this.character$.pipe(
      filter(character => !!character),
      map(character => `${character?.thumbnail.path}.${character?.thumbnail.extension}`),
    );

    this.recommendedComics$ = this.character$.pipe(
      filter(character => !!character),
      switchMap(character =>
        this.characterPageDetailsService.getComicByCharacterId(character?.id, '3'),
      ),
    );
  }

  setActiveComic(id: ID) {
    this.router.navigate([`comics/details/${id}`]);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
