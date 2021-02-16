import * as crypto from 'crypto-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';

import { ComicDataWrapper } from '../../interfaces/comic/comic-data-wrapper';
import { ComicPageStore } from '../../pages/comic/comic-page/state/comic-page.store';

const PRIV_KEY = process.env.PRIV_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const ts = new Date().getTime().toString();
const hash = crypto.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

@Injectable({
  providedIn: 'root',
})
export class ComicPageService {
  constructor(
    private http: HttpClient,
    private comicPageStore: ComicPageStore,
  ) {}

  public getComics(): Observable<ComicDataWrapper> {
    return this.http
      .get<ComicDataWrapper>(
        'https://gateway.marvel.com:443/v1/public/comics',
        {
          params: {
            ts: ts,
            hash: hash,
            apikey: PUBLIC_KEY,
            limit: `${this.comicPageStore.getValue().ui.limit}`,
            offset: `${
              this.comicPageStore.getValue().ui.currentPage *
              this.comicPageStore.getValue().ui.limit
            }`,
          },
        },
      )
      .pipe(
        take(1),
        tap(comics => {
          this.comicPageStore.set(comics.data.results);
          this.comicPageStore.updateTotal(comics.data.total);
          this.comicPageStore.updateTitleStartsWith('');
        }),
      );
  }

  public getComicsBySearch(
    nameStartsWith: string,
  ): Observable<ComicDataWrapper> {
    return this.http
      .get<ComicDataWrapper>(
        'https://gateway.marvel.com:443/v1/public/comics',
        {
          params: {
            ts: ts,
            hash: hash,
            apikey: PUBLIC_KEY,
            limit: `${this.comicPageStore.getValue().ui.limit}`,
            offset: `${
              this.comicPageStore.getValue().ui.currentPage *
              this.comicPageStore.getValue().ui.limit
            }`,
            titleStartsWith: nameStartsWith,
          },
        },
      )
      .pipe(
        take(1),
        tap(comics => {
          this.comicPageStore.set(comics.data.results);
          this.comicPageStore.updateTotal(comics.data.total);
          this.comicPageStore.updateTitleStartsWith(nameStartsWith);
        }),
      );
  }

  public getComicById(id: string): Observable<ComicDataWrapper> {
    return this.http
      .get<ComicDataWrapper>(
        `https://gateway.marvel.com:443/v1/public/comics/${id}`,
        {
          params: {
            ts: ts,
            hash: hash,
            apikey: PUBLIC_KEY,
          },
        },
      )
      .pipe(
        take(1),
        tap(comics => {
          this.comicPageStore.upsertMany(comics.data.results);
          this.comicPageStore.setActive(id);
        }),
      );
  }

  public resetCurrentPage(): void {
    this.comicPageStore.resetCurrentPage();
  }

  public nextPage(): void {
    (this.comicPageStore.getValue().ui.currentPage + 1) *
      this.comicPageStore.getValue().ui.limit <
      this.comicPageStore.getValue().ui.total;
    {
      this.comicPageStore.updateCurrentPage(
        this.comicPageStore.getValue().ui.currentPage + 1,
      );
    }
  }

  public previousPage(): void {
    if (this.comicPageStore.getValue().ui.currentPage > 0) {
      this.comicPageStore.updateCurrentPage(
        this.comicPageStore.getValue().ui.currentPage - 1,
      );
    }
  }

  public setActive(id: ID): void {
    this.comicPageStore.setActive(id);
  }
}
