import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { CharacterDataWrapper } from 'src/app/features/interfaces/character/character-data-wrapper';
import { CharacterPageService } from 'src/app/features/services/character/character-page.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ID } from '@datorama/akita';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { CharacterPageQuery } from './state/character-page.query';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.scss'],
})
export class CharacterPageComponent implements OnInit, OnDestroy {
  constructor(
    private characterService: CharacterPageService,
    private characterPageQuery: CharacterPageQuery,
  ) {}

  public faSearch = faSearch;
  public totalPages: number = 0;
  public currentPage: number = 0;
  public characters$ = this.characterPageQuery.characters$;
  public searchControl: FormControl = new FormControl('');
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public ngOnInit() {
    this.takeExistingData();
    this.initSubscriptions();
  }

  public initSubscriptions() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(600),
        switchMap(() => {
          this.characterService.resetCurrentPage();
          return this.sendRequest();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.scrollToTop();
        this.totalPages = this.characterPageQuery.getTotalPages();
        this.currentPage = this.characterPageQuery.getCurrentPage();
      });

    this.characterPageQuery.currentPage$
      .pipe(
        switchMap(() => {
          return this.sendRequest();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.scrollToTop();
        this.totalPages = this.characterPageQuery.getTotalPages();
        this.currentPage = this.characterPageQuery.getCurrentPage();
      });
  }

  public takeExistingData() {
    if (this.characterPageQuery.getNameStartsWith().length > 0) {
      this.searchControl.setValue(this.characterPageQuery.getNameStartsWith());
    }
    this.totalPages = this.characterPageQuery.getTotalPages();
  }

  public sendRequest(): Observable<CharacterDataWrapper> {
    if (this.searchControl.value === '') {
      return this.characterService.getCharacters();
    }
    return this.characterService.getCharactersBySearch(
      this.searchControl.value,
    );
  }

  public scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public nextPage() {
    this.characterService.nextPage();
  }

  public previousPage() {
    this.characterService.previousPage();
  }

  public setActiveCharacter(id: ID) {
    this.characterService.setActive(id);
  }

  public ngOnDestroy() {
    this.destroy$.next();
  }
}
