import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
import { ComicDataWrapper } from 'src/app/features/interfaces/comic/comic-data-wrapper';
import { ComicPageService } from 'src/app/features/services/comic/comic-page.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ID } from '@datorama/akita';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { ComicPageQuery } from './state/comic-page.query';

@Component({
  selector: 'app-comic-page',
  templateUrl: './comic-page.component.html',
  styleUrls: ['./comic-page.component.scss'],
})
export class ComicPageComponent implements OnInit, OnDestroy {
  constructor(
    private comicService: ComicPageService,
    private comicPageQuery: ComicPageQuery,
  ) {}

  public faSearch = faSearch;
  public totalPages: number = 0;
  public currentPage: number = 0;
  public comics$ = this.comicPageQuery.comics$;
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
          this.comicService.resetCurrentPage();
          return this.sendRequest();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.scrollToTop();
        this.totalPages = this.comicPageQuery.getTotalPages();
        this.currentPage = this.comicPageQuery.getCurrentPage();
      });

    this.comicPageQuery.currentPage$
      .pipe(
        filter(event => !(this.searchControl.value !== '' && event === 0)),
        switchMap(() => {
          return this.sendRequest();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.scrollToTop();
        this.totalPages = this.comicPageQuery.getTotalPages();
        this.currentPage = this.comicPageQuery.getCurrentPage();
      });
  }

  public takeExistingData() {
    if (this.comicPageQuery.getTitleStartsWith().length > 0) {
      this.searchControl.setValue(this.comicPageQuery.getTitleStartsWith());
    }
    this.totalPages = this.comicPageQuery.getTotalPages();
  }

  public sendRequest(): Observable<ComicDataWrapper> {
    if (this.searchControl.value === '') {
      return this.comicService.getComics();
    }
    return this.comicService.getComicsBySearch(this.searchControl.value);
  }

  public scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public nextPage() {
    this.comicService.nextPage();
  }

  public previousPage() {
    this.comicService.previousPage();
  }

  public setActiveCharacter(id: ID) {
    this.comicService.setActive(id);
  }

  public ngOnDestroy() {
    this.destroy$.next();
  }
}
